import React from "react";

const Dashboard = () => {
  return (
    <>
      <section className="">
        <h2>Dashboard</h2>
        <div className="w-[calc(100%-80px)] border border-black ">
          <div className="w-[500px] h-[200px] bg-white rounded-2xl border gap-5 border-black m-3 flex items-center justify-center">
            <span className="text-9xl ">4</span>
            <p className="text-7xl">Users</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
