import { useState } from "react";
import './styles/Home.css'

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error message when typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8978/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = "/userpage"; // Redirect to user page
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="for" onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <label>email : <input
            className="mai"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            /></label>
            <label>password  :  <input 
            className="pas"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            /></label>
            {/* <input 
            className="pas"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            /> */}
            <button className="bu" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default Login;
