import React from "react";

function Cards(props) {
  return (
    <div className=" w-full lg:flex md:w my-5 ">
      <div className="h-48 lg:h-auto lg:w-48 md:w-full flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
        <img src={props.image} className="h-full md:w-full" alt="" />
      </div>
      <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{props.title}</div>
          <p className="text-gray-700 text-base">{props.desc}</p>
        </div>
        <div className="flex items-center">
          {props.username && <div className="">
            <p className=" text-sm bg-green-400 p-1 text-white rounded-lg">@{props.username}</p>
          </div>}
        </div>
      </div>
    </div>


  );
}

export default Cards;
