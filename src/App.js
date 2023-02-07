import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [turn, setturn] = useState(1);
    const [p1score, setp1score] = useState(0);
    const [p2score, setp2score] = useState(0);
    const [p1totalscore, setp1totalscore] = useState(0);
    const [p2totalscore, setp2totalscore] = useState(0);
    const [gameend, setgameend] = useState("");
    const [dice, setdice] = useState(null);

    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        if (p1totalscore >= 50) {
            setgameend("p1");
            setp1totalscore(50);
            return;
        }
        if (p2totalscore >= 50) {
            setp2totalscore(50);
            setgameend("p2");
            return;
        }
        if (p1score + p1totalscore >= 50) {
            setp1totalscore(50);
            setgameend("p1");
            return;
        }
        if (p2score + p2totalscore >= 50) {
            setp2totalscore(50);
            setgameend("p2");
            return;
        }
    }, [p1totalscore, p2totalscore, p1score, p2score]);

    const rolldice = () => {
        if (gameend == "") {
            const number = randomIntFromInterval(1, 6);
            setdice(number);
            if (number == 1) {
                if (turn == 1) {
                    setp1totalscore((pv) => {
                        return pv + p1score;
                    });
                    setp1score(0);
                    setturn(2);
                    return;
                } else {
                    setp2totalscore((pv) => {
                        return pv + p2score;
                    });
                    setp2score(0);
                    setturn(1);
                    return;
                }
            }
            if (turn == 1) {
                setp1score((pv) => {
                    return pv + number;
                });
                return;
            } else {
                setp2score((pv) => {
                    return pv + number;
                });
                return;
            }
        }
    };

    const hold = () => {
        if (gameend == "") {
            if (turn == 1) {
                setp1totalscore((pv) => {
                    return pv + p1score;
                });
                setp1score(0);
                setturn(2);
            } else {
                setp2totalscore((pv) => {
                    return pv + p2score;
                });
                setp2score(0);
                setturn(1);
            }
        }
    };

    const newgame = () => {
        setturn(1);
        setp1score(0);
        setp2score(0);
        setp1totalscore(0);
        setp2totalscore(0);
        setdice(null);
        setgameend("");
    };

    let dicecontent = null;
    if (dice == 1) {
        dicecontent = (
            <div className="dice first-face">
                <span className="dot"></span>
            </div>
        );
    } else if (dice == 2) {
        dicecontent = (
            <div className="dice second-face">
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        );
    } else if (dice == 3) {
        dicecontent = (
            <div className="dice third-face">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        );
    } else if (dice == 4) {
        dicecontent = (
            <div className="fourth-face dice">
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );
    } else if (dice == 5) {
        dicecontent = (
            <div className="fifth-face dice">
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>

                <div className="column">
                    <span className="dot"></span>
                </div>

                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );
    } else if (dice == 6) {
        dicecontent = (
            <div className="sixth-face dice">
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <div className={"container"}>
                <div className={`player ${turn == 1 ? "active" : ""}`}>
                    <h2>PLAYER 1</h2>
                    <div className="total-score">{p1totalscore}</div>
                    <h1 style={{ color: "white" }}>
                        {gameend == "p1" ? "WON" : ""}
                    </h1>
                    <div className="current-score">
                        <p className="current">CURRENT</p>
                        <p className="score">{p1score}</p>
                    </div>
                </div>
                <div className={`player ${turn == 2 ? "active" : ""}`}>
                    <h2>PLAYER 2</h2>
                    <div className="total-score">{p2totalscore}</div>
                    <h1 style={{ color: "white" }}>
                        {gameend == "p2" ? "WON" : ""}
                    </h1>
                    <div className="current-score">
                        <p className="current">CURRENT</p>
                        <p className="score">{p2score}</p>
                    </div>
                </div>
                {dicecontent}
                <button className="new-game" onClick={newgame}>
                    NEW GAME
                </button>
                <button className="roll-dice" onClick={rolldice}>
                    ROLL DICE
                </button>
                <button className="holds" onClick={hold}>
                    HOLD
                </button>
            </div>
        </div>
    );
}

export default App;
