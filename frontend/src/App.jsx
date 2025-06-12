import React from 'react'
import Home from './assets/Home'
import { Routes, Route } from 'react-router-dom'
import Subscription from './assets/Subscription'
import Contact from './assets/Contact'
import Login from './assets/Login'
import Signup from './assets/Signup'
import Userpage from './assets/Userpage'
import Account from './assets/Account'
import PostUpload from './assets/PostUpload'
import Feed from './assets/Feed'
import Global from './assets/Global'
const App = () => { 
  return (
    <div classname="App">
      <Routes>
        <Route path='/PostUpload' element={<PostUpload onUploadSuccess={(url) => console.log("Uploaded Image:", url)} />} />
        <Route path='/' element={<Home />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/Userpage' element={<Userpage />} />
        <Route path="/account" element={<Account />} />
        <Route path='/Feed' element={<Feed />} />
        <Route path="/global" element={<Global />} />
        </Routes>
    </div>
  )
}

export default App
