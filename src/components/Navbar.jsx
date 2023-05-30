import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { UserContext } from '../UserContext';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const flexBetween = "flex items-baseline justify-between";
  const { user,setUser } = useContext(UserContext);
  const isMobile = useMediaQuery({ maxWidth: 450 });
  const navigate = useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    console.log("Logging out...");
    setUser()
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='w-full py-6 font-pp text-slate-100  h-1/5 '>
      <div className={`mx-auto md:w-4/6 ${flexBetween} gap-16 `}>
        <div className='font-extrabold text-4xl p-4  font-bungee'>Points</div>

        {isMobile ? (
          <div className={`w-full`}>
            <div className={`flex flex-row justify-end gap-8 text-sm p-3`}>
              {isMenuOpen ? (
                <button className="rounded-full bg-slate-50 p-2" onClick={() => toggleMenu()}>
                  <XMarkIcon className="h-6 w-6 text-gray-400" />
                </button>
              ) : (
                <button
                  className="rounded-full bg-slate-50 p-2"
                  onClick={() => toggleMenu()}
                >
                  <Bars3Icon className="h-6 w-6 text-black" />
                </button>
              )}
              {isMenuOpen && (
                <div className='flex flex-col w-full absolute h-46 mt-12 justify-center items-center bg-slate-50 rounded-lg mx-auto left-0'>
                  <Link className="text-lg  text-black w-full text-center" to='/'>Home</Link>
                  <hr className="my-1 border-gray-500 w-full" />
                  <Link className="text-lg  text-black w-full text-center" to='/dashboard'>Dashboard</Link>
                  <hr className="my-1 border-gray-500 w-full" />
                  {!user ? 
                  <Link className="text-lg  text-black w-full text-center" to='/Login'>Login</Link>:
                  <span className="text-lg  text-black w-full text-center" onClick={handleLogout}> Logout</span>}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`${flexBetween} gap-8`}>
            <Link className="text-lg" to='/'>Home</Link>
            <Link className="text-lg" to='/dashboard'>Dashboard</Link>
            {!user ? <Link className="text-lg" to='/Login'>Login</Link> : <span className='cursor-pointer' onClick={handleLogout}> Logout</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
