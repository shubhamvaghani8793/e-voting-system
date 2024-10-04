import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Sendmsg from './firecompo/Sendmsg'

import Admin from './votersystem/admin/Admin'
import Adminlogin from './votersystem/adminlogin/Adminlogin'
import Home from './votersystem/home/Home'
import Login from './votersystem/login/Login'
import Panding from './votersystem/panding/Panding'
import Raiseticket from './votersystem/raiseticket/Raiseticket'
import Signup from './votersystem/signup/Signup'
import Updateinfo from './votersystem/update/Updateinfo'
import User from './votersystem/user/User'


function App() {

  return (
    <>
      {/* <Sendmsg/> */}

      {/* <Normal/> */}

      {/* <Realdb/> */}

      {/* <Form/> */}

      {/*******************  E - Voting System  *****************************/}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/adminlogin' element={<Adminlogin/>} />
          <Route path='/raiseticket' element={<Raiseticket/>} />
          <Route path='/updateinformation' element={<Updateinfo/>} />
          <Route path='/pandingtickets' element={<Panding/>} />
          <Route path='/user' element={<User/>} />
        </Routes>
      </BrowserRouter>

      {/* <Home/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <User/> */}
      {/* <Admin/> */}
      {/* <Adminlogin/> */}
      {/* <Panding/> */}
      {/* <Raiseticket/> */}
      {/* <Updateinfo/> */}
    </>
  )
}

export default App
