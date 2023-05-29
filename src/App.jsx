import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Addteams from './pages/Addteams';
import Result from './pages/Result';
import Addresults from './pages/Addresults';
import { UserContextProvider, UserContext } from './UserContext';
import { useContext } from 'react';
import Notfound from './pages/Notfound';

const App = () => {
  const { user } = useContext(UserContext)
  return (
    <div className='h-screen'>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/Login" />
          {
            localStorage.getItem('token') && <>
            <Route element={<Dashboard />} path="/Dashboard" />
              <Route element={<Addteams />} path="/teams/:id" />
              <Route element={<Addresults />} path="/addresult/:id" />
              <Route element={<Result />} path="/result/:id" />
            </>
          }
          <Route path="*" element={<Notfound />} />
        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App



//style={{ background: 'radial-gradient(circle, rgba(249, 211, 73, 1) 20%, rgba(213, 126, 18, 1) 100%)' }}