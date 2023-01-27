import React from "react";
import moment from "moment/moment";
import { useRecoilState } from "recoil";
import { readEmailsAtom } from "./recoil/recoil";

const Card = (props) => {
  const [readEmails, setReadEmails] = useRecoilState(readEmailsAtom);

  function handleReadEmails(id) {
    const newRead = [...readEmails];

    if (!newRead.includes(id)) {
      newRead.push(id);
    }
    setReadEmails(newRead);
  }
  return (
    <div
      key={props.id}
      onClick={() => {
        props.setSelectedEmailId(
          props.id,
          props.name,
          props.date,
          props.subject
        );
        handleReadEmails(props.id);
      }}
      className={`flex flex-row border-2 ${
        props.id === props.selectedEmailId
          ? "border-[#E54065]"
          : "border-[#CFD2DC]"
      } ${
        readEmails.includes(props.id) === true ? "bg-[#F2F2F2]" : "bg-white"
      } h-auto w-auto m-8 rounded-lg overflow-hidden`}
    >
      <div className="m-2 inline-flex items-center justify-center w-12 h-12 overflow-hidden  bg-[#E54065] rounded-full dark:bg-[#E54065]">
        <span className=" font-medium text-xl text-white dark:text-white">
          {props.name.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="flex-1 align-middle text-sm m-2 overflow-hidden">
        <h2>
          From:{" "}
          <b>
            {props.name} &lt;{props.email}&gt;
          </b>
        </h2>
        <h2>
          Subject: <b>{props.subject}</b>
        </h2>
        <h2 className=" mt-1 mb-1 overflow-hidden truncate">
          {props.short_description}
        </h2>
        <div className="flex">
          <h2>{moment(props.date).format("DD/MM/yyyy hh:mm a")}</h2>
          <h2 className="pl-4 font-bold text-[#E54065]">
            {props.favouriteList.includes(props.id) ? "Favourite" : ""}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
