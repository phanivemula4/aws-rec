const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("./models/user");
//hello guys
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
}));

// Create Upload Paths if not exist
const profileUploadPath = path.join(__dirname, "uploads/profiles");
const postUploadPath = path.join(__dirname, "uploads/posts");

if (!fs.existsSync(profileUploadPath)) fs.mkdirSync(profileUploadPath, { recursive: true });
if (!fs.existsSync(postUploadPath)) fs.mkdirSync(postUploadPath, { recursive: true });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Profile Image Storage
const profileStorage = multer.diskStorage({
    destination: profileUploadPath,
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const profileUpload = multer({ storage: profileStorage });

// Post Image Storage (User-specific folders)
const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!req.session.user) return cb(new Error("Not authenticated"));

        const userPostPath = path.join(postUploadPath, req.session.user.id);
        if (!fs.existsSync(userPostPath)) fs.mkdirSync(userPostPath, { recursive: true });

        cb(null, userPostPath);
    },
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const postUpload = multer({ storage: postStorage });

mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection failed:", err));

/* ========== USER AUTHENTICATION ROUTES ========== */
app.post("/api/signup", profileUpload.single("profileImage"), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (await User.findOne({ email })) return res.status(400).json({ message: "User already exists" });

        const newUser = await new User({
            name,
            email,
            password,
            profileImage: req.file ? `/uploads/profiles/${req.file.filename}` : null
        }).save();

        res.status(201).json({ message: "User registered!", user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = { id: user._id, name: user.name, email, profileImage: user.profileImage };
    res.json({ message: "Login successful", user: req.session.user });
});

app.get("/api/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out successfully" });
    });
});

app.get("/api/user", (req, res) => {
    req.session.user ? res.json({ authenticated: true, user: req.session.user }) : res.status(401).json({ message: "User not logged in" });
});

/* ========== USER PROFILE UPDATE ========== */
app.put("/api/update-user", profileUpload.single("profileImage"), async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ message: "Not authenticated" });

        const { name } = req.body;
        const userId = req.session.user.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (req.file) {
            if (user.profileImage) {
                const oldImagePath = path.join(__dirname, user.profileImage);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
            user.profileImage = `/uploads/profiles/${req.file.filename}`;
        }

        await user.save();
        req.session.user = { id: user._id, name: user.name, email: user.email, profileImage: user.profileImage };

        res.json({ message: "Profile updated successfully", user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* ========== POST IMAGE UPLOAD ========== */
app.post("/api/upload-post", postUpload.single("image"), async (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

    const imageUrl = `/uploads/posts/${req.session.user.id}/${req.file.filename}`;

    try {
        const user = await User.findById(req.session.user.id);
        user.posts.push(imageUrl);
        await user.save();

        res.json({ message: "Post uploaded successfully", imageUrl });
    } catch (err) {
        res.status(500).json({ message: "Error uploading post" });
    }
});

/* ========== FETCH POSTS ========== */
app.get("/api/posts", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Find the logged-in user and return only their posts
        const user = await User.findById(req.session.user.id, "posts");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User Posts:", user.posts); // Debugging log
        res.json({ posts: user.posts });
    } catch (err) {
        console.error("Error fetching user posts:", err);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

app.get("/api/user-posts", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Get the logged-in user and their posts
        const user = await User.findById(req.session.user.id, "posts");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ posts: user.posts });
    } catch (err) {
        console.error("Error fetching user posts:", err);
        res.status(500).json({ message: "Error fetching posts" });
    }
});



const PORT = process.env.PORT || 8978;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
