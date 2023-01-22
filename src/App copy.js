import React, { useState, useEffect } from "react";
import moment from "moment";
import NavBar from "./components/navbar";

const App2 = () => {
  const [users, setUsers] = useState([]);
  const [con, setCon] = useState([]);

  useEffect(() => {
    fetch("https://flipkart-email-mock.now.sh")
      .then((response) => response.json())
      .then((response) => setUsers(response.list));
  }, []);

  let id = 2;

  useEffect(() => {
    fetch("https://flipkart-email-mock.now.sh/?id=" + `${id}`)
      .then((response) => response.json())
      .then((response) => setCon(response.body));
  }, []);

  // console.log();

  return (
    <div className="flex flex-row bg-[#F4F5F9] text-[#636363] ">
      <NavBar />
      <div className="">
        {users.map((v) => (
          <div className="flex flex-row border-2 bg-white active:border-[#E54065] border-[#CFD2DC] h-auto w-auto m-8 rounded-lg overflow-hidden">
            <div className="m-2 inline-flex items-center justify-center w-12 h-12 overflow-hidden  bg-[#E54065] rounded-full dark:bg-[#E54065]">
              <span className=" font-medium text-xl text-white dark:text-white">
                {v.from.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1 align-middle text-sm m-2 overflow-hidden">
              <h2>
                From:{" "}
                <b>
                  {v.from.name} &lt;{v.from.email}&gt;
                </b>
              </h2>
              <h2>
                Subject: <b>{v.subject}</b>
              </h2>
              <h2 className=" mt-1 mb-1 overflow-hidden truncate">
                {v.short_description}
              </h2>
              <h2>{moment(v.date).format("DD/MM/yyyy hh:mm a")}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex-1 m-8 border-2 rounded-lg w-auto h-auto bg-white border-[#CFD2DC]"> */}
      <div className="flex flex-row m-8 border-2 bg-white border-[#CFD2DC] h-auto w-auto m-8 rounded-lg">
        <div className="m-2 inline-flex items-center justify-center w-12 h-12 overflow-hidden  bg-[#E54065] rounded-full dark:bg-[#E54065]">
          <span className=" font-medium text-xl text-white dark:text-white">
            {users.map((v) => v.from.name.charAt(0).toUpperCase())}
          </span>
        </div>

        <div className="flex-1 m-2">
          <div>
            {users.map((v) => (
              <div>{v.from.name}</div>
            ))}
          </div>

          <div
            className="flex-1 align-middle text-sm m-2 overflow-hiddenm-8 text-justify &_p:pb-4"
            dangerouslySetInnerHTML={{ __html: con }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
