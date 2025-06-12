import React, { useState, useRef } from "react";
import axios from "axios";
import "./styles/PostUpload.css"; // Ensure this file exists

const PostUpload = ({ onUploadSuccess }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    console.log("PostUpload Component Rendered!"); // Debug log

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError(""); // Clear error if file selected
        }
    };

    const handleUpload = async () => {
        if (!image) {
            setError("Please select an image!");
            return;
        }
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:8978/api/upload-post", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            onUploadSuccess(response.data.imageUrl);
            setImage(null);
            setPreview(null);
            fileInputRef.current.value = ""; // Reset file input
        } catch (err) {
            setError("Upload failed. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="upload-container">
            <h2 className="upp">Upload Your Image</h2>
            <div className="upload-box">
                {preview && <img src={preview} alt="Preview" className="preview-image" />}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <button className="select-btn" onClick={() => fileInputRef.current.click()} disabled={loading}>
                    {loading ? "Uploading..." : image ? "Change Image" : "Select Image"}
                </button>
                {image && (
                    <button className="upload-btn" onClick={handleUpload} disabled={loading}>
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                )}
                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
};

export default PostUpload;
