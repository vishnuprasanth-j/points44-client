import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from 'react-router-dom';
const TournamentCard = ({ tournament,handleDelete }) => {
  const createdAt = new Date(tournament.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short"
  });

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 ">
      <div className="flex items-center mb-4">
        <img
          src="/helmet.png"
          alt="Bulletin"
          className="h-6 w-6 mr-2"
        />
        <h2 className="text-lg font-bold">{tournament.tourneyname}</h2>
      </div>
      <p className="text-gray-500 mb-2">Created at: {createdAt}</p>
      <div className="flex justify-center">
      <Link to={`/teams/${tournament._id}`} className="mr-2">
          <PencilIcon className="h-6 w-6 text-gray-500 animate-wiggle" />
        </Link>
        <button onClick={()=>handleDelete(tournament._id)}>
          <TrashIcon className="h-6 w-6 text-red-500 animate-wiggle" />
        </button>
      </div>
    </div>
  );
};

export default TournamentCard;
