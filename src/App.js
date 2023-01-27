import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar";
import Card from "./components/card";
import EmailBody from "./components/emailBody";
import { favouriteEmailAtom } from "./components/recoil/recoil";
import { useRecoilState } from "recoil";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [favouriteList, setFavouriteList] = useRecoilState(favouriteEmailAtom);

  useEffect(() => {
    fetch("https://flipkart-email-mock.now.sh")
      .then((response) => response.json())
      .then((response) => setUsers(response.list));
  }, []);

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

  function handleFilterFavourite() {
    return console.log("fav clicked");
  }

  return (
    <>
      <NavBar filterFavourites={handleFilterFavourite} />
      <main className="container bg-[#F4F5F9] text-[#636363]">
        <div className="flex ml-14 mr-14 mb-14 ">
          <div className="grow  w-[35%]">
            {users.map((v) => (
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
