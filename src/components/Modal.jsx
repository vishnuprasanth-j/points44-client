import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

const Modal = (props) => {
    const { close } = props
    const {user}=useContext(UserContext)
    const [values, setValues] = useState({
        organiser: "",
        tourneyname: "",
        KillPoints: "",
        placepoints: [
            "15", "12", "10", "8", "6", "4", "2", "1", "1", "1", "1",
            "1", "1", "0", "0", "0", "0", "0", "0", "0"
        ]
    });
    const { organiser, tourneyname, KillPoints, placepoints } = values;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const arrhandleChange = (e) => {
        const { value, name } = e.target;
        const arrnew = [...placepoints];
        arrnew[name] = value;
        setValues({
            ...values,
            placepoints: arrnew
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("https://points44-api.vercel.app//add/tournament",values, {
          headers: {
            Authorization: 'Bearer ' + user
          }}
          )
      
        setValues({
          organiser:'',
          tourneyname:'',
          KillPoints:'',
          placepoints:['15','12','10','8']
        })
        close()
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <form onSubmit={handleSubmit} className="Modal-form">
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-300 sm:mx-0 sm:mb-0">
                                    <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 decoration-wavy underline" id="modal-headline">
                                        Create Tournament
                                    </h3>
                                    <div className="mt-2">
                                        <div className="mb-4">
                                            <div>
                                                <div className="w-full mb-4"> <span className="w-full">Organiser:</span>
                                                    <input type="text" className="w-full p-2" name="organiser" value={organiser} onChange={handleChange} required /></div>
                                                <div className="w-full mb-4"> <span className="w-full">Tourney name:</span>
                                                    <input type="text" className="w-full p-2" name="tourneyname" value={tourneyname} onChange={handleChange} required /></div>
                                                <div className="w-full mb-4"><span className="w-full4">FinishPoints:</span>
                                                    <input type="number" className="w-full p-2" name="KillPoints" value={KillPoints} onChange={handleChange} required min="0" max="10" /></div>
                                            </div>

                                            <table className="w-full">
                                                <thead>
                                                    <tr>
                                                        <th>Position</th>
                                                        <th>Points</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {placepoints.map((point, index) => (
                                                        <tr key={index}>
                                                            <td >#{index + 1}</td>
                                                            <td>
                                                                <input
                                                                    className="p-2 w-20"
                                                                    id="pp"
                                                                    name={index}
                                                                    value={point}
                                                                    onChange={arrhandleChange}
                                                                    type="number"
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-3xl border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => close()}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-3xl border shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;