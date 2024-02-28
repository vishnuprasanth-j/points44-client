import {createContext, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios'
export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [email,setEmail]=useState(null);
  const [teams,setTeams]=useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [currtournament, setCurrTournament] = useState();
  const location = useLocation();
  const fetchTournament=(user)=>{
    axios.get("https://points-b.onrender.com/get/tournament", {   
      headers: {
        Authorization: 'Bearer ' + user
      }
    }
    )
      .then(response => {
        setTournaments(response.data.tournaments);
      })
      .catch(error => {
        console.error('Error fetching tournaments:', error);
      });
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const st=JSON.parse(localStorage.getItem('token'))
      setEmail(st.email)
      setUser(st.token)
      if(user){
        fetchTournament(user)
      }
    }
  }, [location]);
  return (
    <UserContext.Provider value={{user,setUser,email,setEmail,teams,setTeams,tournaments, setTournaments,currtournament, setCurrTournament}}>
      {children}
    </UserContext.Provider>
  );
}