import "./styles.css";
import React from "react";

export default function App() {
  const [gameState, setGameState] = React.useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]);
  // false - X, true - 0
  const [playerState, setPlayerState] = React.useState(false);
  const [gameEnd, setGameEnd] = React.useState(false);
  const [gameDraw, setGameDraw] = React.useState(false);

  const checkDiagonals = (player) => {
    if (player) {
      return (
        (gameState[0] === "0" &&
          gameState[4] === "0" &&
          gameState[8] === "0") ||
        (gameState[2] === "0" && gameState[4] === "0" && gameState[6] === "0")
      );
    } else {
      return (
        (gameState[0] === "X" &&
          gameState[4] === "X" &&
          gameState[8] === "X") ||
        (gameState[2] === "X" && gameState[4] === "X" && gameState[6] === "X")
      );
    }
  };

  const checkRows = (player) => {
    if (player) {
      return (
        (gameState[0] === "0" &&
          gameState[1] === "0" &&
          gameState[2] === "0") ||
        (gameState[3] === "0" &&
          gameState[4] === "0" &&
          gameState[5] === "0") ||
        (gameState[6] === "0" && gameState[7] === "0" && gameState[8] === "0")
      );
    } else {
      return (
        (gameState[0] === "X" &&
          gameState[1] === "X" &&
          gameState[2] === "X") ||
        (gameState[3] === "X" &&
          gameState[4] === "X" &&
          gameState[5] === "X") ||
        (gameState[6] === "X" && gameState[7] === "X" && gameState[8] === "X")
      );
    }
  };

  const checkColumns = (player) => {
    if (player) {
      return (
        (gameState[0] === "0" &&
          gameState[3] === "0" &&
          gameState[6] === "0") ||
        (gameState[1] === "0" &&
          gameState[4] === "0" &&
          gameState[7] === "0") ||
        (gameState[2] === "0" && gameState[5] === "0" && gameState[8] === "0")
      );
    } else {
      return (
        (gameState[0] === "X" &&
          gameState[3] === "X" &&
          gameState[6] === "X") ||
        (gameState[1] === "X" &&
          gameState[4] === "X" &&
          gameState[7] === "X") ||
        (gameState[2] === "X" && gameState[5] === "X" && gameState[8] === "X")
      );
    }
  };

  const checkGamePlay = () => {
    return (
      checkColumns(playerState) ||
      checkRows(playerState) ||
      checkDiagonals(playerState)
    );
  };

  const checkGameDraw = () => {
    let stateCount = 0;
    for (let i = 0; i < 9; i++) {
      if (gameState[i] === "") stateCount++;
    }

    return stateCount === 0;
  };

  const getButtonState = (key) => {
    if (gameState[key] !== "" || gameEnd || gameDraw) return;

    gameState[key] = playerState ? "0" : "X";
    setPlayerState(!playerState);
    setGameState([...gameState]);
    if (checkGamePlay()) setGameEnd(true);
    if (checkGameDraw()) setGameDraw(true);
  };

  const createButton = (key) => {
    return (
      <button key={key} onClick={() => getButtonState(key)}>
        {gameState[key]}
      </button>
    );
  };

  const getRows = (rowNum) => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(createButton(3 * rowNum + i));
    }
    return <div className="row">{rows}</div>;
  };

  const getGrid = () => {
    const grid = [];
    for (let i = 0; i < 3; i++) {
      grid.push(getRows(i));
    }
    return (
      <div>
        {grid}
        {(gameEnd || gameDraw) && (
          <div>
            {`Game end. Player ${!playerState ? "0" : "X"} has won.`}
            <div>
              <button
                onClick={() => {
                  setGameEnd(false);
                  setPlayerState(false);
                  setGameDraw(false);
                  setGameState(["", "", "", "", "", "", "", "", ""]);
                }}
                className="restart"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return <div className="App">{getGrid()}</div>;
}
