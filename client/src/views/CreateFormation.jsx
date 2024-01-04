import axios from "axios";
import React, { useEffect, useState } from "react";
import { Field } from "../components/field/Field";
import { Form } from "../components/form/Form";
import GAME_LINEUPS from "..//constants/lineups.json";


export default function Home() {
  const [playersOnField, setPlayersOnField] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [gameLineup, setGameLineup] = useState("4-3-3");
  const [allLineups, setLineups] = useState(GAME_LINEUPS.lineups);

  //Function to add the player to the field
  const addPlayerToField = (playerToAdd = {}, position = "") => {
    const playersCopy = [...playersOnField];
    playersCopy[parseInt(position)] = playerToAdd;
    setPlayersOnField(playersCopy);
    const reduceAllPlayer = allPlayers.filter(
      (player) => player.name !== playerToAdd.name
    );
    setAllPlayers([...reduceAllPlayer]);
  };

  // Add players to my available players
  const addPlayers = (player = {}) => {
    setAllPlayers([...allPlayers, player]);
  };

  // Function to change the game lineup
  const changeLineup = (lineup = "") => {
    setGameLineup(lineup);
  };

  // Function to send a player off the field
  const sendPlayerOff = (playerIndex = "") => {
    const playersFieldCopy = [...playersOnField];
    const ejectedPlayer = playersFieldCopy.splice(playerIndex, 1, {});
    setPlayersOnField([...playersFieldCopy]);
    addPlayers(ejectedPlayer[0]);
  };

  return (
    <div>

      <div className="">
        <Field
          currentLineup={gameLineup}
          playersOnField={playersOnField}
          setLineup={changeLineup}
          allPlayers={allPlayers}
          addPlayerToField={addPlayerToField}
          sendPlayerOff={sendPlayerOff}
          allLineups={allLineups}
        />
        <Form allPlayers={allPlayers} addPlayers={addPlayers} />
      </div>
    </div>
  );
};
