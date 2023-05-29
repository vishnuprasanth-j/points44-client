import { useEffect, useContext, useState } from 'react';
import Menu from '../components/PopupMenu';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useParams } from 'react-router-dom';
import Table from '../components/Table';
import TournamentMatches from '../components/TournamentMatches';

const Addresults = () => {
  const { id } = useParams();
  const { user, teams, setCurrTournament, currtournament } = useContext(UserContext);
  const [selectState, setSelectState] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [finishPoints, setFinishPoints] = useState('');
  const [matches, setMatches] = useState([])
  const addResult = () => {
    if (!selectedTeam || !finishPoints) {
      return;
    }
    const position = results.length + 1
    const newResult = {
      team: selectedTeam,
      finishPoints: finishPoints,
      position: position,
      total: parseInt(currtournament.placepoints[position - 1]) + parseInt(finishPoints),
      wwcd: position === 1 ? 1 : 0,
      matchplayed: 1
    };

    setResults(prevResults => [...prevResults, newResult]);
    setSelectedTeam('');
    setFinishPoints('');
    setSelectState(prevState => prevState.filter(team => team !== selectedTeam));
  };

  const undoResult = () => {
    const lastResult = results[results.length - 1];
    setResults(prevResults => prevResults.slice(0, -1));
    setSelectState(prevState => [...prevState, lastResult.team]);
  };

  const saveResult = async () => {
    try {
      await axios.post(`https://points44-api.vercel.app/add/result/${id}`, { results: results }, {
        headers: {
          Authorization: 'Bearer ' + user
        }
      })
      fetchMatches(id)
    } catch (err) {
      console.log(err)
    }

  }
  const deleteResult =async (matchId) => {
    try {
      await axios.delete(`https://points44-api.vercel.app/delete/result/${id}/${matchId}`, {
        headers: {
          Authorization: 'Bearer ' + user
        }
      })
      fetchMatches(id)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchMatches(id)
    if (teams.length > 0) {
      localStorage.setItem('teams', JSON.stringify(teams));
    }
    const data = JSON.parse(localStorage.getItem('teams'));
    const currT = JSON.parse(localStorage.getItem('currT'))
    setSelectState([...data]);
    setCurrTournament(currT)

  }, [user]);

  const fetchMatches = async (tournamentId) => {
    try {
      const response = await axios.get(`https://points44-api.vercel.app/get/teams/${tournamentId}`, {
        headers: {
          Authorization: 'Bearer ' + user
        }
      });
      const { tournament } = response.data;
      localStorage.setItem('currT',JSON.stringify(tournament))
      setMatches([...tournament.Match])

    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  console.log(results)
  return (
    <div className='w-4/5 mx-auto text-black'>
      <Menu />
      <div className='w-full flex flex-col justify-center items-center gap-y-2'>
        <div className='bg-slate-50 rounded-full p-4'>#{results.length + 1}</div>
        <select
          className='w-52 p-3'
          value={selectedTeam}
          onChange={e => setSelectedTeam(e.target.value)}
        >
          <option value="" className='' disabled>
            Select a Team
          </option>
          {selectState.length > 0 &&
            selectState.map((team, index) => {
              return <option key={index}>{team}</option>;
            })}
        </select>
        <input
          className="w-52 p-3 placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded"
          type="number"
          min="0"
          max="96"
          value={finishPoints}
          onChange={(e) => setFinishPoints(e.target.value)}
          placeholder="Finishes"
        />
        <div>
          <button
            className="p-2 text-white bg-green-500 hover:bg-green-600 m-2 rounded-md tracking-wide"
            onClick={addResult}
            disabled={!finishPoints || selectState.length === 0}
          >
            Add
          </button>
          <button
            className="p-2 bg-red-500 hover:bg-red-600 text-white m-2  rounded-md tracking-wide"
            onClick={undoResult}
            disabled={results.length === 0}
          >
            Undo
          </button>

        </div>
      </div>
      <Table results={results} saveResult={saveResult} isMatchlist={false} />
      <div className='w-full mt-8'>
        <h1 className='font-bold text-3xl mb-4 w-full '>Matches List</h1>
        {matches &&
          <TournamentMatches matches={matches} deleteResult={deleteResult} />
        }
      </div>

    </div>
  );
};

export default Addresults;
