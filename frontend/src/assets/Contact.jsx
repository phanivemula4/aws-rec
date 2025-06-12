import React from 'react'
import './styles/Home.css'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <body>
            <div className='box'>
                <div className='header'>
                    <img className='im' src="/mediialogo.png" alt="Logo" />
                    <h1 className='na'>Happy Media</h1>
                    <div className='losi'>
                        <Link to="/login">
                            <button className="log">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="sin">Signup</button>
                        </Link>
                    </div>
                </div>
                <div className='menu'>
                    <Link to="/">
                        <button className='bot'>Home</button>
                    </Link>
                    <Link to="/subscription">
                        <button className='bot'>Subsciption</button>
                    </Link>
                    <Link to="/contact">
                        <button className='bot'>Contact</button>
                    </Link>
                </div>
                <div className='content'>
                    <p className="para">Email: support@socialmedia.com<br></br>

                        Phone: +1 (555) 123-4567<br></br>

                        Address: 123 Main St, Suite 456, New York, NY 10001<br></br>


                        Social Media:
                        <br></br>

                        Facebook: @socialmedia<br></br>

                        Twitter: @socialmedia<br></br>

                        Instagram: @socialmedia<br></br>

                        LinkedIn: (link unavailable)
                        <br></br>

                        Hours of Operation:<br></br>


                        Monday - Friday: 9am - 5pm EST<br></br>
                        Saturday - Sunday: Closed

                    </p>

                </div>
                <div className='sider'>
                    sider
                </div>
            </div>
        </body>
    )
}

export default Contact
