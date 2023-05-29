

export default function Table({ results, saveResult,isMatchlist,id,deleteResult}) {
  console.log(id)
  return (
    <div className="flex flex-col mt-6 items-center" >
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" overflow-hidden sm:rounded-lg">
            <table className="w-2/4 text-sm text-gray-400 ">
              <thead className="bg-gray-800 text-xs uppercase font-medium">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left tracking-wider">
                    Team
                  </th>
                  <th scope="col" className="px-6 py-3 text-left tracking-wider">
                    F
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800">
                {results &&
                  results.map((result, i) => {
                    const isEven = i % 2 === 0;
                    const rowClass = isEven ? "bg-black bg-opacity-20" : "bg-gray-800";
                    return (
                      <tr className={rowClass} key={i}>
                        <td className="pl-4">{result.position}</td>
                        <td className="flex px-6 py-4 whitespace-nowrap">
                          <span className="font-medium">{result.team}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{result.finishPoints}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4">
       {!isMatchlist? <button className="w-20 h-10 bg-green-500 p-2 rounded-md text-white hover:bg-green-600 tracking-wide" onClick={() => saveResult()}>Save</button>
       : <button className="w-20 h-10 bg-red-500 p-2 rounded-md text-white hover:bg-red-600 tracking-wide" onClick={() => deleteResult(id)}>Delete</button>}
      </div>
    </div>
  );
}
         

