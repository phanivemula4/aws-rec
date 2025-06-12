import React, { useEffect, useState } from "react";
import axios from "axios";
import PostUpload from "./PostUpload";
import Feed from "./Feed";
import "./styles/Home.css"; // Ensure this file is linked for styling

const Userpage = () => {
    const [user, setUser] = useState(null);
    const [refreshFeed, setRefreshFeed] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8978/api/user", { withCredentials: true })
            .then(({ data }) => setUser(data.authenticated ? data.user : null))
            .catch(() => setUser(null));
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8978/api/logout", { withCredentials: true });
            setUser(null);
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="container">
            {/* Header Section */}
            <div className="header">
                <div className="logo">
                    <img src="/mediialogo.png" alt="Logo" />
                    <h1>Happy Media</h1>
                </div>
                {user && (
                    <div className="user-info">
                        <img
                            src={user.profileImage ? `http://localhost:8978${user.profileImage}` : "/default-profile.png"}
                            alt="Profile"
                            className="profile-img"
                        />
                        <h2>{user.name}</h2>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Left Sidebar */}
                <div className="left-sidebar">
                    <button className="pani" onClick={() => window.location.href = "/account"}>Account</button>

                    {/* <PostUpload onUploadSuccess={() => setRefreshFeed(prev => !prev)} /> */}
                    <button className="pani" onClick={() => window.location.href = "/PostUpload"}>Upload</button>
                    <button className="pani" onClick={() => window.location.href = "/global"}>Global</button>
                    <button className="pani" onClick={handleLogout}>Logout</button>

                </div>

                {/* Center Feed */}
                <div className="feed-section">
                    <Feed key={refreshFeed} />
                </div>
            </div>
        </div>
    );
};

export default Userpage;
