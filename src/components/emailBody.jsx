import React, { useState, useEffect } from "react";
import moment from "moment/moment";

function EmailBody(props) {
  const [emailContent, setEmailContent] = useState(null);
  useEffect(() => {
    fetch(
      "https://flipkart-email-mock.now.sh/?id=" + `${props.selectedEmailId}`
    )
      .then((response) => response.json())
      .then((response) => setEmailContent(response.body));
  }, [props.selectedEmailId]);

  // function handleFavourite(id) {
  //   let favourite = true ? false : true;
  //   // setFavourite(favourite);
  //   // return favourite;
  //   console.log(favourite);
  // }

  return (
    <div className="grow flex border-2 m-8 bg-white border-[#CFD2DC] rounded-lg">
      <div className="mb-8 ml-8 mt-8 mr-7 inline-flex items-center justify-center w-14 h-14 overflow-hidden  bg-[#E54065] rounded-full dark:bg-[#E54065]">
        <span className=" font-medium text-xl text-white dark:text-white">
          {props.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 flex-col mt-8 mr-8 ">
        <div className="flex grow container">
          <div className="flex grow text-3xl ">
            <b>{props.subject}</b>
          </div>
          <button
            onClick={() => props.onClick(props.selectedEmailId)}
            className="flex-none text-sm h-8 w-40 text-white  bg-[#E54065] rounded-full  "
          >
            {!props.favourite ? "Mark as Favourite" : "Remove from Favourite"}
          </button>
        </div>
        <div className="flex-1 grow ">
          &nbsp;
          <h2>{moment(props.date).format("DD/MM/yyyy hh:mm a")}</h2>
          &nbsp;
          <div
            className=" mr-8 mb-20 mt-2 [&_p]:pb-8 "
            dangerouslySetInnerHTML={{ __html: emailContent }}
          />
        </div>
      </div>
    </div>
  );
}

export default EmailBody;
