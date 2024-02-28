import { useState,useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import Menu from "../components/PopupMenu";
import { UserContext } from "../UserContext";
import axios from 'axios';

const Addteams = () => {
  const { id } = useParams();
  const [teamName, setTeamName] = useState("");
  const [tourneyName, setTourneyName] = useState("");
  const { user,teams, setTeams,setCurrTournament,currtournament} = useContext(UserContext)
  useEffect(()=>{
    fetchTeams(id)
  },[user])

  const fetchTeams = async (tournamentId) => {
    try {
      const response = await axios.get(`https://points-b.onrender.com/get/teams/${tournamentId}`, {
        headers: {
          Authorization: 'Bearer ' + user
        }
      });
  
      const { teams,tournament } = response.data;
      // Handle the retrieved teams data as needed (e.g., update state)
      setCurrTournament(tournament)
      localStorage.setItem('currT',JSON.stringify(tournament))
      setTeams([...teams])
      setTourneyName(tournament.tourneyname)
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };
  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

 
const handleAddTeam = async () => {
  if (teamName.trim() !== "") {
    try {
      const response = await axios.post(`https://points-b.onrender.com/add/team/${id}`, {
        team: teamName
      }, {
        headers: {
          Authorization: 'Bearer ' + user
        }
      });

      const { tournament } = response.data;
      setTeams([...tournament.Teams]);
      setTeamName("");
    } catch (error) {
      console.error('Error adding team:', error);
    }
  }
};
const handleDeleteTeam = async (index) => {
  try {
    const teamToDelete = teams[index];
    const response = await axios.delete(`https://points44-api.vercel.app/delete/team/${id}`, {
      headers: {
        Authorization: 'Bearer ' + user
      },
      data: {
        team: teamToDelete
      }
    });

    const { tournament } = response.data;
    setTeams([...tournament.Teams]);
  } catch (error) {
    console.error('Error deleting team:', error);
  }
};
  const sortedTeams = teams.map((team, index) => ({
    number: index + 1,
    name: team,
  }));

  return (
    <div className="w-4/5 mx-auto ">
   
    <div className="w-4/6 mx-auto h-full bg-white rounded-lg p-3 ">
    <div className="w-full mb-4  h-12 "> 
    {currtournament&&<h1 className="flex justify-center items-center text-gray-400 text-2xl ">{currtournament.tourneyname}</h1>}
    </div>
    <Menu />

<div className="mt-4 flex flex-col justify-center items-center ">

  <div className="flex flex-col">
    <input
      type="text"
      value={teamName}
      onChange={handleInputChange}
      placeholder="Enter team name"
      className="md:w-64 w-48 h-10 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
    />
    <button
      onClick={handleAddTeam}
      className="mb-4 md:w-64  w-48 h-10 mt-2 px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600"
    >
      Add Team
    </button>
  </div>

<div className="flex flex-col justify-start items-start">
<div className="w-64 h-10 mt-4 md:text-left text-center"><h1 className="text-2xl">Teams List</h1></div>

<ul className=" divide-y divide-gray-200 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg md:ml-0  ml-8 ">
    {sortedTeams.map((team) => (
      <li
        key={team.number}
        className="md:w-64 w-48  h-10 flex items-center justify-between py-2 px-4  hover:bg-white rounded-md"
      >
        <span>{`${team.number}. ${team.name}`}</span>
        <button
          onClick={() => handleDeleteTeam(team.number - 1)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
        <TrashIcon className="w-6 h-6 text-red-500 hover:animate-pulse"/>
        </button>
      </li>
    ))}
  </ul>
</div>

</div>
    </div>
  
    </div>
  );
};

export default Addteams;



//<ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
//<li class="pb-3 sm:pb-4">
//   <div class="flex items-center space-x-4">
//      <div class="flex-shrink-0">
//         <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
//      </div>
//      <div class="flex-1 min-w-0">
//         <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
//            Neil Sims
//         </p>
//         <p class="text-sm text-gray-500 truncate dark:text-gray-400">
//            email@flowbite.com
//         </p>
//      </div>
//      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
//         $320
//      </div>
//   </div>
//</li>
//
//</ul>