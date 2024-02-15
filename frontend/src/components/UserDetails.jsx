// src/components/UserDetails.jsx
import React from "react";
import { LiaPhoneAltSolid } from "react-icons/lia";
import { RiAccountCircleFill } from "react-icons/ri";
import dp from "./../assets/dp.jpg";

const UserDetails = () => {
  return (
    <div className="bg-[#eff2f7] h-full ">
      <div className="flex flex-col items-center bg-white pt-8 pb-10">
        <img
          src={dp}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <span className="font-bold text-xl mt-1">Amit RG</span>
        <span className="text-sm text-gray-500 font-base">Offline</span>

        <div className="flex mt-4">
          <button className="border-gray-300 border-2 px-3 flex flex-row items-center justify-center py-0.5 rounded mr-2">
            <LiaPhoneAltSolid size="20" /> <span className="ml-1">Call</span>
          </button>
          <button className="border-gray-300 border-2 px-3 flex flex-row items-center justify-center py-0.5  rounded">
            <RiAccountCircleFill size="20" />{" "}
            <span className="ml-1">Profile</span>
          </button>
        </div>
      </div>
      <div className=" flex flex-col justify-between">
        <div className="m-4 mt-4 card shadow-md bg-white p-4 rounded-xl ">
          <h1 className="text-left text-xl font-bold mb-3">Customer Details</h1>
          <div className="flex justify-between items-center">
            <span className="text-left text-gray-500 mb-2">Email</span>
            <span className="text-right font-semibold">
              amit@richplanet.com
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-left text-gray-500">First Name</span>
            <span className="text-right font-semibold">Amit</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-left text-gray-500">Last Name</span>
            <span className="text-right font-semibold">RG</span>
          </div>
          <button className="text-[#4b75a2] mt-1 font-bold hover:underline">
            View more details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
