import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate= useNavigate()
  const [isRegister, setIsRegister] = useState(false);
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [regerr,setRegErr]=useState("")
  const [logerr,setLogErr]=useState("")
  const handleLogin = async(e) => {
    e.preventDefault();
    try {
 const res= await axios.post('https://points44-api.vercel.app/login',loginState);
      setLoginState({
        email:"",
        password:""
      })
      navigate('/table')
      const st={
        token:res.data.token,
        email:res.data.email
      }
      localStorage.setItem('token',JSON.stringify(st))
    } catch (err) {
     
     const{error}=err.response.data
     setLogErr(error)
    }
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const res=await axios.post('https://points44-api.vercel.app/register',registerState);
      setRegisterState({
        name: "",
        email: "",
        password: ""
      })
      navigate('/Dashboard')
      const st={
        token:res.data.token,
        email:res.data.email
      }
      localStorage.setItem('token',JSON.stringify(st))
      console.log(res.error)
    } catch (err) {
      const {error}=err.response.data
      setRegErr(error)
    }
  
  };

  const handleRegisterChange = (e) => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-4/5 mx-auto text-white">
      <div
        className={`w-80 mx-auto bg-white bg-opacity-20  shadow-lg rounded-lg flex flex-col justify-center transition-all duration-500 ${
          isRegister ? "h-96" : "h-80"
        }`}
      >
        <div className="p-4 mt-10">
          {isRegister ? (
            <form onSubmit={handleRegister}>
              <input
                required
                type="text"
                className="w-full px-4 py-2 mb-4 bg-transparent border border-white rounded focus:outline-none focus:border-gray-300"
                placeholder="Name"
                name="name"
                value={registerState.name}
                onChange={handleRegisterChange}
              />
              <input
                required
                type="email"
                className="w-full px-4 py-2 mb-4 bg-transparent border border-white rounded focus:outline-none focus:border-gray-300"
                placeholder="Email"
                name="email"
                value={registerState.email}
                onChange={handleRegisterChange}
              />
              <input
                required
                type="password"
                className="w-full px-4 py-2 mb-4 bg-transparent border border-white rounded focus:outline-none focus:border-gray-300"
                placeholder="Password"
                name="password"
                value={registerState.password}
                onChange={handleRegisterChange}
              />
              <button className="w-full px-4 py-2 mb-4 text-white bg-black rounded hover:bg-gray-900 focus:outline-none">
                Register
              </button>
              <button
                type="submit"
                onClick={() => setIsRegister(false)}
                className="items-end w-full px-4 py-2 mb-4 text-white bg-black rounded hover:bg-gray-900 focus:outline-none"
              >
                Already have an account
              </button>
              {
                regerr.length>0&&<div className="text-red-500  text-center">{regerr}</div>
              }
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <input
                required
                type="email"
                className="w-full px-4 py-2 mb-4 bg-transparent border border-white rounded focus:outline-none focus:border-gray-300"
                placeholder="Email"
                name="email"
                value={loginState.email}
                onChange={handleLoginChange}
              />
              <input
                required
                type="password"
                className="w-full px-4 py-2 mb-4 bg-transparent border border-white rounded focus:outline-none focus:border-gray-300"
                placeholder="Password"
                name="password"
                value={loginState.password}
                onChange={handleLoginChange}
              />
              <button className="w-full px-4 py-2 mb-4 text-white bg-black rounded hover:bg-gray-900 focus:outline-none">
                Sign In
              </button>
              <button
                type="submit"
                onClick={() => setIsRegister(true)}
                className="items-end w-full px-4 py-2 mb-4 text-white bg-black rounded hover:bg-gray-900 focus:outline-none"
              >
                Create an account
              </button>
              {
                logerr.length>0&&<div className="text-red-500 text-center">{logerr}</div>
              }
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
