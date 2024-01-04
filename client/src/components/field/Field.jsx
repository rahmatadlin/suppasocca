import React from "react";
import "./Field.css";
import _ from "lodash";

export const Field = ({
  currentLineup,
  playersOnField,
  setLineup,
  allPlayers,
  addPlayerToField,
  sendPlayerOff,
  allLineups,
}) => {
  // State to manage the hidden property of all options of elements
  const [lineupPositionsOpt, setLineupPositionOpt] = React.useState(
    Array(11).fill(true)
  );

  // Function to handle logic of the buttons to change the lineup
  const onClick = (e) => {
    e.preventDefault();
    const lineup = e.target.name;
    setLineup(lineup);
  };

  // Function to show list options to change the player
  const onClickSelect = (e) => {
    e.preventDefault();
    const position = e.target.name;
    if (
      playersOnField[position] &&
      Object.keys(playersOnField[position]).length !== 0
    ) {
      sendPlayerOff(position);
    } else {
      changeSelectVisibility(position);
    }
  };

  // Function to change the visibility of the select element to choose a player for the field
  const changeSelectVisibility = (position) => {
    const previousValue = lineupPositionsOpt[position];
    const arrayHiddenOptions = Array(11).fill(true);
    arrayHiddenOptions[position] = !previousValue;
    setLineupPositionOpt(arrayHiddenOptions);
  };

  // Function manage the selecting player to the field
  const onClickOption = (e) => {
    e.preventDefault();
    // Get the student index and the field position to enter the player to the field
    const indexesString = e.target.id;
    const indexes = indexesString.split("-");
    const playerIndex = indexes[1];
    const fieldPositionIndex = indexes[0];

    addPlayerToField(allPlayers[playerIndex], fieldPositionIndex);
    changeSelectVisibility(fieldPositionIndex);
  };

  return (
    <>
      <div className="matchcenter-field">
        {!_.isEmpty(allLineups) &&
          Array(11)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  id={index}
                  className="player"
                  key={index}
                  style={{
                    left: `${allLineups[currentLineup]["x"][index] ?? 0}px`,
                    top: `${allLineups[currentLineup]["y"][index] ?? 0}px`,
                    display: "block",
                  }}
                >
                  <div className="player-nr">
                    {playersOnField[index]?.gamePosition ?? "-"}
                  </div>

                  <div className="player-name">
                    {playersOnField[index]?.name?.split(" ")[0] ?? ""}
                  </div>
                  <a
                    className="click-manage"
                    onClick={onClickSelect}
                    name={index}
                  ></a>
                  <div
                    className="players-options"
                    hidden={lineupPositionsOpt[index]}
                  >
                    {allPlayers.map((player, playerIndex) => {
                      return (
                        <div
                          className="option"
                          key={player.name}
                          onClick={onClickOption}
                          id={index + "-" + playerIndex}
                        >
                          {player.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </div>
      <div className="lineups mt-10">
        <div className="subtitle is-6">Lineups</div>
        <div className="flex space-x-2">
          {Object.keys(allLineups).map((key) => {
            return (
              <button
                id={key}
                className="button border border-white rounded px-4 py-2"
                onClick={onClick}
                name={key}
                key={key}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
