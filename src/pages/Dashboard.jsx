
import { useState, useEffect, useContext } from 'react'
import Modal from '../components/Modal'
import axios from 'axios';
import { UserContext } from '../UserContext';

import TournamentCard from '../components/Card';

const Dashboard = () => {
  //const [tournaments, setTournaments] = useState([]);
  const { user,tournaments, setTournaments } = useContext(UserContext)
  const [openmodal, setOpenmodal] = useState(false)
  const handleCreate = () => {
    console.log(openmodal)
    setOpenmodal(true)
  }

  const handleClose = () => {
    setOpenmodal(false)
    fetchTournament(user)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://points44-api.vercel.app/delete/tournament/${id}`, {
        headers: {
          Authorization: 'Bearer ' + user
        }
      });
      setTournaments((prevTournaments) =>
        prevTournaments.filter((tournament) => tournament._id !== id)
      );
    } catch (error) {
      console.error(error.response.data); // Failed to delete tournament
    }
  }
  const fetchTournament=(user)=>{
    axios.get("https://points44-api.vercel.app/get/tournament", {
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
fetchTournament(user)
  }, [user]);

  console.log(tournaments)
  return (
    <div className='w-4/5 mx-auto'>
      <div className='w-full flex justify-center md:justify-end mb-4'>
        <button className='p-4 bg-slate-200 rounded-full hover:bg-slate-400' onClick={handleCreate}>Add a Tournament</button>
      </div>
      <div className='md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid grid-flow-row gap-4 w-full justify-items-center '>
        {tournaments.length > 0 ? (
          tournaments.map((tournament, index) => (
            <TournamentCard key={index} tournament={tournament} handleDelete={handleDelete} />
          ))
        ) : (
          <p>No tournaments found.</p>
        )}
      </div>
      {
        openmodal && <Modal close={handleClose} />
      }
    </div>

  )
}

export default Dashboard