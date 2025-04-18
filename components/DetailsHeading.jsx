import React from "react";

const DetailsHeading = ({ title }) => {
  return (
    <div className="card-border mt-3 flex items-center gap-3 px-2 py-3 bg-black rounded-ee-2xl border-2 border-yellow-50 w-full ">
      <div className="leading-3">
        <p className=" text-sm font-bold text-white pl-3">{title}</p>
      </div>
    </div>
  );
};

export default DetailsHeading;
