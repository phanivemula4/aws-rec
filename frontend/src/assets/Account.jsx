import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles/Account.css"; // Ensure this file exists

const Account = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);

    // Fetch user data when the component mounts
    useEffect(() => {
        axios.get("http://localhost:8978/api/user", { withCredentials: true })
            .then(({ data }) => {
                if (data.authenticated) {
                    setUser(data.user);
                    setName(data.user.name);
                    setPreview(`http://localhost:8978${data.user.profileImage}`);
                }
            })
            .catch(() => setUser(null));
    }, []);

    // Handle Image Preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreview(URL.createObjectURL(file));
            setMessage(""); // Clear previous messages
        }
    };

    // Handle Profile Update
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        if (profileImage) formData.append("profileImage", profileImage);

        try {
            const { data } = await axios.put("http://localhost:8978/api/update-user", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage(data.message);
            setUser(data.user);
            setPreview(`http://localhost:8978${data.user.profileImage}?t=${new Date().getTime()}`);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            setMessage("Update failed. Try again.");
        }
    };

    if (!user) return <h2>Please log in to view your account details.</h2>;

    return (
        <div className="account-container">
            <h1>My Account</h1>
            <div className="profile-section">
                <img className="profile-pic" src={preview || "/default-profile.png"} alt="Profile" />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <button className="select-btn" onClick={() => fileInputRef.current.click()}>
                    {profileImage ? "Change Image" : "Select Image"}
                </button>
            </div>

            <div className="update-section">
                <label classname="fi">Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
                <button className="update-btn" onClick={handleUpdate}>Update Profile</button>
            </div>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Account;
