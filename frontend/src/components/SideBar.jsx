import { useState } from "react";
import { BsFillInboxFill, BsFillPeopleFill } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/user/action";

const Sidebar = ({ dp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  const getIconClasses = (iconName) => {
    return activeIcon === iconName ? "bg-white " : "bg-[#004e95]";
  };

  return (
    <div className="bg-[#004e95]  h-full flex flex-col justify-between">
      <div className="flex flex-col justify-center items-center ">
        <div className="px-4 py-5">
          <img
            src="https://asset.brandfetch.io/idIegfyRr9/id4nTV92W-.png"
            width="30"
            height="30"
            alt=""
          />
        </div>
        <div
          className={`px-[1.3rem] hover:opacity-75  py-4 cursor-pointer ${getIconClasses(
            "inbox"
          )}`}
          onClick={() => handleIconClick("inbox")}
        >
          <BsFillInboxFill
            color={activeIcon === "inbox" ? "#004e95" : "white"}
            size="30"
          />
        </div>
        <div
          className={`px-[1.3rem] hover:opacity-75 py-4 cursor-pointer ${getIconClasses(
            "people"
          )}`}
          onClick={() => handleIconClick("people")}
        >
          <BsFillPeopleFill
            color={activeIcon === "people" ? "#004e95" : "white"}
            size="30"
          />
        </div>
        <div
          className={`px-[1.3rem] hover:opacity-75 py-4 cursor-pointer ${getIconClasses(
            "trend"
          )}`}
          onClick={() => handleIconClick("trend")}
        >
          <FaArrowTrendUp
            color={activeIcon === "trend" ? "#004e95" : "white"}
            size="30"
          />
        </div>
      </div>
      <div className="flex flex-col mb-3 justify-center items-center">
        <div className={`px-[1.3rem] py-4 pb-8 `}>
          <MdLogout
            className="cursor-pointer  hover:opacity-75 "
            onClick={() => dispatch(logout(navigate))}
            color="white"
            size="30"
          />
        </div>
        <img
          onClick={() => navigate("/connect/facebook")}
          src={dp}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Sidebar;
