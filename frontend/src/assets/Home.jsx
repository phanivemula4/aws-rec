import React from 'react'
import './styles/Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
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
          <p className="para">Welcome to our chatting community! This is a friendly space where you can connect with people from all over the world. Share your thoughts, ideas, and experiences with others, and get to know them better.

            Whether you're looking for advice, support, or just someone to talk to, our community is here for you. Our chat rooms are open 24/7, so feel free to join in anytime. Be respectful, be kind, and let's build a positive and uplifting community together!</p><img className="imgg" src="/chat1.jpg"></img>
        </div>
        <div className='sider'>
          sider
        </div>
      </div>
    </body>
  )
}

export default Home
