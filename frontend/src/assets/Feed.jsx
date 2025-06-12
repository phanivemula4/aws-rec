import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Home.css";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8978/api/user-posts", {
                    withCredentials: true, // Ensures session is included
                });

                if (response.data.posts) {
                    setPosts(response.data.posts);
                } else {
                    setError("No posts found.");
                }
            } catch (err) {
                setError("Error fetching your posts.");
                console.error("Error fetching user posts:", err);
            }
            setLoading(false);
        };

        fetchUserPosts();
    }, []);

    return (
        <div>
            <h2>Your Uploaded Posts</h2>
            {loading ? <p>Loading your posts...</p> : null}
            {error && !loading ? <p>{error}</p> : null}
            {posts.length === 0 && !loading && !error ? <p>No posts uploaded yet.</p> : null}
            
            <div className="hay" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {posts.map((post, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>
                        <img src={`http://localhost:8978${post}`} alt="Post" style={{ width: "200px" }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
