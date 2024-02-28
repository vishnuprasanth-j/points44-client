import Menu from "../components/PopupMenu"
import html2canvas from 'html2canvas';
import { useRef, useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useParams } from 'react-router-dom';
const Result = () => {
  const componentRef = useRef(null);
  const { id } = useParams();
  const [result, setResult] = useState([])
  const { user } = useContext(UserContext)
  const data=JSON.parse(localStorage.getItem('currT'))
  const ppArray =data.positons
  const tourneyname=data.tourneyname
  const downloadComponentAsPNG = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'component.png';
      link.click();
    });
  };

  function reduceTeamsData(data) {
    const reducedResult = data.reduce((accumulator, item) => {
      const team = item.matches[0].team;
      const finishPoints = item.matches.reduce(
        (total, match) => total + parseInt(match.finishPoints),
        0
      );
      const matchPlayed = item.matches.length;
      const total = item.matches.reduce(
        (total, match) => total + parseInt(match.total),
        0
      );
      const wwcd = item.matches.reduce(
        (total, match) => total + parseInt(match.wwcd),
        0
      );
    
      accumulator.push({ team, finishPoints, matchPlayed, total, wwcd });
      return accumulator;
    }, []);
  
    const reducedResult2= reducedResult.reduce((accumulator, item) => {
      const { team, finishPoints, matchPlayed, total, wwcd } = item;
  
      const existingTeamIndex = accumulator.findIndex(
        (entry) => entry.team === team
      );
  
      if (existingTeamIndex !== -1) {
        // Team already exists, update the values
        accumulator[existingTeamIndex].finishPoints += finishPoints;
        accumulator[existingTeamIndex].matchPlayed += matchPlayed;
        accumulator[existingTeamIndex].total += total;
        accumulator[existingTeamIndex].wwcd += wwcd;
      } else {
        // Team doesn't exist, add a new entry
        accumulator.push({ team, finishPoints, matchPlayed, total, wwcd });
      }
  
      return accumulator;
    }, []);
  
    const sortedResult = reducedResult2.sort((a, b) => b.total - a.total);

    return sortedResult;
  }
  

  const fetchResult = async (tournamentId) => {
    try {
      const response = await axios.get(`https://points-b.onrender.com/get/teams/${tournamentId}`, {
        headers: {
          Authorization: 'Bearer ' + user
        }
      });
      const { tournament } = response.data;
      const rData=reduceTeamsData(tournament.Match)
      setResult([...rData])

    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('currT'))) {
      const data=JSON.parse(localStorage.getItem('currT'))

      const rData=reduceTeamsData(data.Match)
      setResult([...rData])
    } else {
      fetchResult(id)
    }
  }, [])
  return (
    <div className="w-4/5 mx-auto">
      <Menu />
      <div className="flex flex-col mt-6 " ref={componentRef}>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <h1 className="text-lg text-gray-400 font-medium text-center bg-gray-800">{tourneyname}</h1>
            <div className="shadow overflow-hidden ">
              <table className="min-w-full text-sm text-gray-400">
                <thead className="bg-gray-800 text-xs uppercase font-medium">
                  <tr>
                    <th></th>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      team
                    </th>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      MP
                    </th>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      WWCD
                    </th>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      F
                    </th>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      TP
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
{
  result&& result.map((value,i)=>{
    const isEven = i % 2 === 0;
    const rowClass = isEven ? "bg-black bg-opacity-20" : "bg-gray-800";
    return    <tr className={rowClass} key={i}>
                    <td className="pl-4">
                     {i+1}
                    </td>
                    <td className="flex px-6 py-4 whitespace-nowrap">
                      <span className="ml-2 font-medium">{value.team}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {value. matchPlayed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {value.wwcd}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {value.finishPoints}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {value.total}
                    </td>

                  </tr>
  })
}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-6">
      <button onClick={downloadComponentAsPNG} className=" w-48 h-10 tracking-wider bg-amber-800 text-white
       hover:bg-amber-200 hover:text-black ">Download as PNG</button>
      </div>

    </div>
  )
}

export default Result
