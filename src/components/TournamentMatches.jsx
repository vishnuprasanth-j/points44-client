import React, { useState } from "react";
import Table from './Table'
import { EyeIcon,EyeSlashIcon } from "@heroicons/react/24/outline";
function TournamentMatches({ matches,deleteResult }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const toggleDropdown = (matchId) => {
    setSelectedMatch(matchId === selectedMatch ? null : matchId);
  };

  return (
    <div className="space-y-4 flex justify-center flex-wrap gap-2">
      {matches.length>0?matches.map((match, index) => (
        <div key={index} className="p-4 rounded  lg:w-1/2 md:w-1/2 w-full  bg-gray-100 backdrop-filter backdrop-blur-sm bg-opacity-30">
        <div className="flex items-center justify-between">  <h3 className="text-xl font-bold">Match {index + 1}</h3>
          <button
            className="px-4 py-2 bg-slate-800 hover:bg-white  rounded  hover:text-black text-white "
            onClick={() => toggleDropdown(index)}
          >
            {selectedMatch === index ? <EyeIcon className="w-6 h-6"/> : <EyeSlashIcon className="w-6 h-6   "/>}
          </button> </div>
        
          {selectedMatch === index && (
            <div className="mt-4 block">
              <ul className="mt-2">
              <li  className="text-gray-700">
              <Table results={match.matches} isMatchlist={true} id={match._id} deleteResult={deleteResult}/>
              </li>
              </ul>
            </div>
          )}
        </div>
      )):<div className="w-full max-auto">No matches have been added yet. </div>}
    </div>
  );
}

export default TournamentMatches;
