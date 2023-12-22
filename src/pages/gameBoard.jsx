import { useReducer, useRef } from "react";
import CenterBox from "../components/centerBox";
import "./gameBoard.css";
import Pawn from "../components/pawn";

const initialValues = {
  diceNumber: 0,
  currentPosition: null,
  pawnToShow: null,
  tempGoal: null,
  red: {
    red1: "r_step_0",
    red2: "r_step_0",
    red3: "r_step_0",
    red4: "r_step_0",
  },
  green: {
    green1: "g_step_0",
    green2: "g_step_0",
    green3: "g_step_0",
    green4: "g_step_0",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_RED1":
      return {
        ...state,
        red: {
          ...state.red,
          red1: action.payload,
        },
      };
    case "showPawn":
      return { ...state, pawnToShow: action.payload };
    case "currentPosition":
      return { ...state, currentPosition: action.payload };
    case "tempGoal":
      return { ...state, tempGoal: action.payload };
    case "dice":
      return { ...state, diceNumber: action.payload };
    default:
      return state;
  }
}

const redPatch = [
  "r_step_0",
  "r_step_1",
  "r_step_2",
  "r_step_3",
  "r_step_4",
  "r_step_5",
  "r_step_6",
  "r_step_7",
  "r_step_8",
  "r_step_9",
  "r_step_10",
  "r_step_11",
  "r_step_12",
  "r_step_13",
  "r_step_14",
  "r_step_15",
];

export default function GameBoard() {
  const [{ red, green, currentPosition, pawnToShow, diceNumber }, dispatch] =
    useReducer(reducer, initialValues);
  const board = useRef(null);

  function handleClick() {
    rollDice();
  }

  function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1; // Roll the dice (1-6)
    dispatch({ type: "dice", payload: diceValue });
    if (diceValue === 6) {
      movePawnOutOfHome("red"); // Assuming you're moving a red pawn
    }
    // Get the current position of the red pawn (e.g. "red1")
    let currentPos = red.red1;

    // Find the index of the current position in the path
    const currentIndex = redPatch.indexOf(currentPos);
    if (currentIndex > 0) {
      // Calculate the new index based on the dice value
      const newIndex = currentIndex + diceValue;

      // If the newIndex exceeds the path length, the pawn has reached the end
      if (newIndex < redPatch.length) {
        // Update the position of the green pawn
        red.red1 = redPatch[newIndex];

        // Update the state
        dispatch({ type: "UPDATE_RED1", payload: red.red1 });
      }
    }

    return diceValue; // Return the dice value for any other logic you might have
  }
  function movePawnOutOfHome(color) {
    if (color === "green") {
      if (green.green1 === "g_step_0") {
        // Assuming 'g_step_0' is the starting position
        dispatch({ type: "UPDATE_GREEN1", payload: "g_step_1" }); // Move it to the game path
      }
      // Similarly, you can add logic for other green pawns
    } else if (color === "red") {
      if (red.red1 === "r_step_0") {
        dispatch({ type: "UPDATE_RED1", payload: "r_step_1" });
      }
      // Similarly, you can add logic for other red pawns
    }
    // You can expand this for other colors like blue and yellow
  }

  console.log("dice:" + diceNumber);

  return (
    <div className="gameBoard" ref={board}>
      <div className={`innerBox bgBlue`}>
        <div className="box">
          <div className="bgBlue"></div>
          <div className="bgBlue"></div>
          <div className="bgBlue"></div>
          <div className="bgBlue"></div>
        </div>
      </div>
      <div className="top">
        {Array.from({ length: 18 }, (_, i) => {
          if (i === currentPosition) {
            return (
              <div key={i} className="pawnBox">
                <Pawn
                  color={`${pawnToShow === "red" ? "red" : "green"}`}
                  scale={"scale(0.5)"}
                />
              </div>
            );
          } else if (i === 6) {
            return (
              <div className={`symbol symbolRed`} key={i}>
                <h1>&#9734;</h1>
              </div>
            );
          } else if (i === 1) {
            return (
              <div className={`symbol symbolRed`} key={i}>
                <h1>&#x21e9;</h1>
              </div>
            );
          } else if (i === 5 || i === 8 || i === 11 || i === 14 || i === 17) {
            return <div key={i} className={``}></div>;
          } else if (
            i === 4 ||
            i === 5 ||
            i === 7 ||
            i === 10 ||
            i === 13 ||
            i === 16
          ) {
            return <div key={i} className={`bgRed`}></div>;
          } else {
            return <div key={i}></div>;
          }
        })}
      </div>
      <div className={`innerBox bgRed`}>
        <div className="box">
          {Object.values(red).map((step, i) => {
            return (
              <div key={i} className="bgRed" onClick={() => handleClick(i)}>
                <Pawn key={i} color="red" position={step} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="left">
        {Array.from({ length: 18 }, (_, i) => {
          if (i === 14) {
            return (
              <div className={`symbol symbolBlue`} key={i}>
                <h1>&#9734;</h1>
              </div>
            );
          } else if (i === 6) {
            return (
              <div className={`symbol symbolBlue`} key={i}>
                <h1>&#x21e8;</h1>
              </div>
            );
          } else if (
            i === 1 ||
            i === 7 ||
            i === 8 ||
            i === 9 ||
            i === 10 ||
            i === 11
          ) {
            return <div key={i} className={`bgBlue`}></div>;
          }
          //  else if (
          //   i === 1 ||
          //   i === 7 ||
          //   i === 8 ||
          //   i === 9 ||
          //   i === 10 ||
          //   i === 11
          // ) {
          //   return <div key={i} className={`$'bgBlue}`}></div>;
          // }
          else {
            return <div key={i}></div>;
          }
        })}
      </div>
      <div>
        <CenterBox />
      </div>
      <div className="right">
        {Array.from({ length: 18 }, (_, i) => {
          // if(i === currentPosition){
          //   return <div key={i} className='pawnBox} ><Pawn color={`${pawnToShow === 'red'? 'red': "green"}`} scale={'scale(0.5)'} /></div>;
          // }
          //
          if (i === 3) {
            return (
              <div className={`symbol symbolYellow`} key={i}>
                <h1>&#9734;</h1>
              </div>
            );
          } else if (i === 11) {
            return (
              <div className={`symbol symbolYellow`} key={i}>
                <h1>&#x21e6;</h1>
              </div>
            );
            // } else if (
            //   i === 0 ||
            //   i === 1 ||
            //   i === 2 ||
            //   i === 3 ||
            //   i === 4 ||
            //   i === 5 ||
            //   i === 11 ||
            //   i === 17 ||
            //   i === 16 ||
            //   i === 15 ||
            //   i === 14 ||
            //   i === 13 ||
            //   i === 12
            // ) {
            //   return <div key={i} className={`pathColor`}></div>;
          } else if (
            i === 6 ||
            i === 7 ||
            i === 8 ||
            i === 9 ||
            i === 10 ||
            i === 16
          ) {
            return <div key={i} className={`bgYellow`}></div>;
          } else {
            return <div key={i}></div>;
          }
        })}
      </div>
      <div className={`innerBox bgGreen`}>
        <div className="box">
          {Object.values(green).map((step, i) => {
            return (
              <div key={i} className="bgGreen">
                <Pawn key={i} color="green" position={step} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="bottom">
        {Array.from({ length: 18 }, (_, i) => {
          if (i === 11) {
            return (
              <div className={`symbol symbolGreen relative`} key={i}>
                <h1>&#9734;</h1>
              </div>
            );
          } else if (i === 16) {
            return (
              <div className={`symbol symbolGreen relative`} key={i}>
                <h1>&#x21e7;</h1>
              </div>
            );
          } else if (
            i === 1 ||
            i === 4 ||
            i === 7 ||
            i === 10 ||
            i === 12 ||
            i === 13
          ) {
            return <div key={i} className={`bgGreen relative`}></div>;
          } else {
            return <div key={i}> </div>;
          }
        })}
      </div>
      <div className="innerBox bgYellow">
        <div className="box">
          <div className="bgYellow"></div>
          <div className="bgYellow"></div>
          <div className="bgYellow"></div>
          <div className="bgYellow"></div>
        </div>
      </div>
    </div>
  );
}
