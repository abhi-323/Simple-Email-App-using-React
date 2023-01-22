import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar";
import Card from "./components/card";
import EmailBody from "./components/emailBody";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [favourite, setFavourite] = useState(false);
  const [selectedFavourite, setSelectedFavourite] = useState(null);
  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
    fetch("https://flipkart-email-mock.now.sh")
      .then((response) => response.json())
      .then((response) => setUsers(response.list));
  }, []);

  // console.log("app: ", selectedEmailId);

  function handleSelectedEmailId(id, name, date, subject) {
    // console.log(id);
    // console.log(selectedEmailId);
    if (id === selectedEmailId) setSelectedEmailId(null);
    else setSelectedEmailId(id);
    setSelectedName(name);
    setSelectedDate(date);
    setSelectedSubject(subject);
    // console.log(id);
    // console.log(name);
    // console.log(date);
  }

  function handleFavourite(id) {
    setFavourite(!favourite);
    setSelectedFavourite(id);

    setFavouriteList(users.filter((f) => !f.from.id == id));
    console.log(favouriteList);
  }

  return (
    <>
      <NavBar />
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
                  favourite={favourite}
                  selectedFavourite={selectedFavourite}
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
                favourite={favourite}
                onClick={handleFavourite}
                selectedFavourite={selectedFavourite}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
