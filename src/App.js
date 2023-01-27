import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar";
import Card from "./components/card";
import EmailBody from "./components/emailBody";
import {
  favouriteEmailAtom,
  readEmailsAtom,
  selectedFilterAtom,
} from "./components/recoil/recoil";
import { useRecoilState } from "recoil";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [favouriteList, setFavouriteList] = useRecoilState(favouriteEmailAtom);
  const [readEmails] = useRecoilState(readEmailsAtom);
  const [filterFavouriteUser, setFilterFavouriteUser] = useState(null);
  const [filterReadUser, setFilterReadUser] = useState(null);
  const [filterUnreadUser, setFilterUnreadUser] = useState(null);
  const [selectedFilter] = useRecoilState(selectedFilterAtom);
  const [switchFilter, setSwitchFilter] = useState([]);

  useEffect(() => {
    fetch("https://flipkart-email-mock.now.sh")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response.list);
        setSwitchFilter(response.list);
      });
  }, []);

  useEffect(() => {
    setFilterFavouriteUser(
      users.filter((user) => favouriteList.includes(user.id))
    );
  }, [favouriteList]);

  useEffect(() => {
    setFilterReadUser(users.filter((user) => readEmails.includes(user.id)));
  }, [readEmails]);

  useEffect(() => {
    setFilterUnreadUser(users.filter((user) => !readEmails.includes(user.id)));
  }, [readEmails]);

  function handleSelectedEmailId(id, name, date, subject) {
    if (id === selectedEmailId) setSelectedEmailId(null);
    else setSelectedEmailId(id);
    setSelectedName(name);
    setSelectedDate(date);
    setSelectedSubject(subject);
  }

  function handleFavourite(id) {
    let newFavouriteList = [...favouriteList];
    if (newFavouriteList.includes(id)) {
      newFavouriteList = newFavouriteList.filter((email) => email !== id);
    } else {
      newFavouriteList.push(id);
    }
    setFavouriteList(newFavouriteList);
  }
  useEffect(() => {
    switch (selectedFilter) {
      case "Unread":
        setSwitchFilter(filterUnreadUser);
        break;

      case "Read":
        setSwitchFilter(filterReadUser);
        break;
      case "Favourite":
        setSwitchFilter(filterFavouriteUser);
        break;
      default:
        setSwitchFilter(users);
    }
  }, [selectedFilter]);

  return (
    <>
      <NavBar />
      <main className="container bg-[#F4F5F9] text-[#636363]">
        <div className="flex ml-14 mr-14 mb-14 ">
          <div className="grow  w-[35%]">
            {switchFilter.map((v) => (
              <div key={v.id}>
                <Card
                  id={v.id}
                  name={v.from.name}
                  email={v.from.email}
                  subject={v.subject}
                  short_description={v.short_description}
                  date={v.date}
                  setSelectedEmailId={handleSelectedEmailId}
                  selectedEmailId={selectedEmailId}
                  favouriteList={favouriteList}
                />
              </div>
            ))}
          </div>
          {selectedEmailId && (
            <div className="flex w-[70%] h-full">
              <EmailBody
                key={selectedEmailId}
                selectedEmailId={selectedEmailId}
                name={selectedName}
                date={selectedDate}
                subject={selectedSubject}
                onClick={handleFavourite}
                favouriteList={favouriteList}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
