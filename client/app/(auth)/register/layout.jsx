import React from "react";

const Layout = ({ children }) => {
  console.log("yes");

  return (
    <div>
      <main className="h-screen w-full flex justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
