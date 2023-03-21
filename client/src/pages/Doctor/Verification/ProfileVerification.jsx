import React from "react";
import { FaRegClock } from "react-icons/fa"; // import clock icon from react-icons/fa

function ProfileVerification() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center space-y-6">
        <div className="text-5xl text-blue-500">
          <FaRegClock />
        </div>
        <h1 className="text-3xl font-bold text-center">
          Profile Under Verification
        </h1>
        <p className="text-lg text-center">
          Thank you for submitting your profile! We are currently reviewing it
          and will notify you once it has been verified.
        </p>
        <p className="text-lg text-center">
          In the meantime, please ensure that your profile information is up to
          date and accurate.
        </p>
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => console.log("Resend Verification Email")}
        >
          Resend Verification Email
        </button> */}
      </div>
    </div>
  );
}

export default ProfileVerification;
