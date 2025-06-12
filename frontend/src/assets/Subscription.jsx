import React from 'react'
import './styles/Home.css'
import { Link } from 'react-router-dom'

const Subscription = () => {
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
                    <p className='para'>Basic Plan
                        $4.99/month
                        - Access to exclusive content
                        - Limited access to expert advice
                        - Standard customer support
                        <br></br>
                        <br></br>
                        Premium Plan
                        $9.99/month
                        - Full access to exclusive content
                        - Priority access to expert advice
                        - Priority customer support
                        - Ability to join exclusive groups
                        <br></br>
                        <br></br>
                        VIP Plan
                        $19.99/month
                        - All Premium Plan benefits
                        - Personalized expert advice
                        - Direct messaging with experts
                        - Complimentary access to special events</p>

                </div>
                <div className='sider'>
                    sider
                </div>
            </div>
        </body>
    )
}

export default Subscription
