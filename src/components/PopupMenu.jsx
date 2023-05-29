import { useState } from "react";
import { DocumentPlusIcon, PlusIcon, TableCellsIcon,ArrowRightIcon,XMarkIcon } from "@heroicons/react/24/outline";
import { Link,useParams } from "react-router-dom";


const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const {id}=useParams()
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`container-menu z-30 ${isActive ? "active" : ""}`}>
      <div className="btn-menu animate-bounce  " onClick={toggleMenu}>
     
      {
        isActive?
         <XMarkIcon  className="w-6 h-6 absolute top-1/4 left-1/4 " />:
         <ArrowRightIcon className="w-6 h-6 absolute top-1/4 left-1/4"/>
      }
      </div>
      <div className="blob blob-1">
        <Link to={`/teams/${id}`}  data-tooltip="Teams" className="h-6 w-6 group relative">
          <PlusIcon className="text-white" />
          <span className="absolute ml-12 rounded-full invisible bg-white text-black text-xs py-1 px-2 -mt-8 left-full transform -translate-x-1/2 group-hover:visible">
            Teams
          </span>
        </Link>
      </div>
      <div className="blob blob-2">
        <Link to={`/addresult/${id}`} data-tooltip="Add Result" className="h-6 w-6 group relative">
          <DocumentPlusIcon className="text-white" />
          <span className="absolute ml-12 rounded-full invisible bg-white text-black text-xs py-1 px-2 -mt-8 left-full transform -translate-x-1/2 group-hover:visible">
            Add Result
          </span>
        </Link>
      </div>
      <div className="blob blob-3">
        <Link to={`/result/${id}`} data-tooltip="Result" className="h-6 w-6 group relative">
          <TableCellsIcon className="text-white" />
          <span className="absolute ml-12 rounded-full invisible bg-white text-black text-xs py-1 px-2 -mt-8 left-full transform -translate-x-1/2 group-hover:visible">
            Result
          </span>
        </Link>
      </div>
      {
        !isActive&&   <div className="blob blob-3">
        <div to="/result" data-tooltip="Result" className="h-6 w-6 group relative">
        <TableCellsIcon className="text-white" />
        </div>
      </div>
      }
    </div>
  );
};

export default Menu;
