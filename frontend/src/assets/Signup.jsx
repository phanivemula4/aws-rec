import { useState } from "react";
import './styles/Home.css'

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", profileImage: null });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => value && formDataToSend.append(key, value));

        try {
            const res = await fetch("http://localhost:8978/api/signup", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert("Signup successful!");
            window.location.href = "/login";
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form className="for" onSubmit={handleSubmit}>
            <label>name : <input
                className="mai"

                name="name"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                required
            /></label>

            <label>email :  <input
                className="mai"

                name="email"
                type="text"
                placeholder="Email"
                onChange={handleChange}
                required
            /></label>

            <label>Password : <input
                className="mai"

                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
            /></label>

            <label>Upload profile picture : <input
                className="mai"

                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                required
            /></label>

            <button className="biu" type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
