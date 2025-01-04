"use client";

import { useSelector } from "react-redux";

const RegisterDetails = () => {
  const { user } = useSelector((state) => state.signUp);
  return (
    <p className="text-gray-700 text-lg mb-2">
      Dear {user.firstName} {user.lastName}
    </p>
  );
};

export default RegisterDetails;
