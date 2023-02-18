import './styles/App.css';
import { createContext, useEffect, useState } from 'react';
import Topbar from './components/Topbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Share from './components/Share';
import Sidebar from './components/Sidebar';
import LectureNotes from './components/LectureNotes';
import Hakkinda from "./pages/Hakkinda"
import LandingPage from './pages/LandingPage';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SingleNote from './pages/SingleNote';
import Footer from './components/Footer';
import UpdateProfile from './pages/UpdateProfile';

export const Context = createContext()

function App() {
  
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState();
  const [message, setMessage] = useState(false)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('accessToken'));
    setUser(user)
    setAccessToken(token)
  },[])

  return (
    <div className="app"> 
      <BrowserRouter>

        <Context.Provider value={{user, setUser, notes, setNotes, 
          filteredNotes, setFilteredNotes, accessToken, setAccessToken, message, setMessage}}>

          <Topbar/>

          <Routes>
            <Route path='/' exact element={<LandingPage/>}></Route>
            <Route path='/home' exact element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/hakkinda' element={<Hakkinda/>}></Route>
            <Route path='/share' element={<Share/>}></Route>
            <Route path='/updateprofile' element={<UpdateProfile/>}></Route>
            <Route path='/single/:id' element={<SingleNote/>}></Route>
          </Routes>

          <Footer/>
          
        </Context.Provider>
        
      </BrowserRouter>
     
    </div>
  );
}

export default App;
