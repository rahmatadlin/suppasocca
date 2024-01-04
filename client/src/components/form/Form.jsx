import React, { useState } from "react";
import Datepicker from "../datepicker/Datepicker";
import "./Form.css";
// import "bulma/css/bulma.min.css";

export const Form = ({ allPlayers, addPlayers }) => {
  const [player, setPlayer] = useState({});

  // Function to manage on click action to save the player
  const onClick = (e) => {
    e.preventDefault();
    addPlayers({ ...player });
    setPlayer({
      name: "",
      age: "",
      weight: "",
      birthDate: "",
      gamePosition: "",
    });
  };

  // Function to manage the on change action when editing a input
  const onChange = (e) => {
    e.preventDefault();
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  // Function to change the date from the datepicker
  const onChangeBirthDate = ({ date }) => {
    setPlayer({ ...player, birthDate: date });
  };

  return (
    <div className="form p-4 mt-20 ml-7 bg-gray-100">
      {" "}
      {/* Set the background to half of the screen */}
      <form>
      <h1 className="text-xl text-black text-center">Create your dream team</h1>

        <div className="form-content">
          <h2 className="text-xl text-black font-semibold mb-4">
            Register Player
          </h2>{" "}
          {/* Make the text black */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border p-2"
              name="name"
              placeholder="e.g. Bambang"
              onChange={onChange}
              value={player.name}
            />
          </div>
      
          <div className="mb-4">
            <label className="block text-gray-700">Number</label>
            <input
              type="text"
              className="w-full border p-2"
              placeholder="e.g. 5"
              name="gamePosition"
              onChange={onChange}
              value={player.gamePosition}
            />
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              type="submit"
              onClick={onClick}
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <div className="form-content content">
        <div className="text-xl text-black font-semibold mb-4">
          Players Added
        </div>{" "}
        {/* Make the text black */}
        <ul className="text-black">
          {allPlayers.map((player) => (
            <li
              key={player.name + player.gamePosition + player.birthDate}
              className="mb-2"
            >
              {player.name}({player.gamePosition})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
