import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";

const Chat = () => {
  const [ws, setWs] = useState("");
  const [onlinepeople, setOnlinePeople] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    setWs(ws);
    ws.addEventListener("message", handlemessage);
  }, []);
  function showpeopleOnline(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }
  function handlemessage(e) {
    const messageData = JSON.parse(e.data);
    if ("online" in messageData) {
      showpeopleOnline(messageData.online);
    }
    // e.data.text().then(messageString=>console.log(messageString))
  }
  return (
    <div className="h-screen flex">
      <div className="w-1/5 bg-primary pl-4 pt-4">
        <div className="flex items-center gap-2 text-2xl text-blue-600 font-bold mb-2 sm:text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
          </svg>
          Chat Me!
        </div>
        <div className="flex flex-col gap-2 max-w-64 md:mr-4 sm:mr-4 mr-4">
          {Object.keys(onlinepeople).map((userId) => (
            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-100">
              <Avatar userId={userId} username={onlinepeople[userId]}></Avatar>
              {onlinepeople[userId]}
            </div>
          ))}
        </div>
      </div>
      <div className="w-4/5 bg-secondary p-2 flex flex-col">
        <div className="flex-grow">Message with selected Person</div>
        <div className="flex gap-2 ">
          <input
            type="text"
            placeholder="Type Your Message Here"
            className="p-2 bg-white border rounded-md flex-grow"
          />
          <button className="bg-blue-500 p-2 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
