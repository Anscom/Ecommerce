import React from "react";

const AuthImagePattern = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-amber-100 p-12">
      <div className="max-w-md text-center">
        <img
          src={imageSrc}
          alt="Auth"
          className="w-full h-auto rounded-2xl shadow-lg mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
