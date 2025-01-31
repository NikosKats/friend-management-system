import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl">Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
