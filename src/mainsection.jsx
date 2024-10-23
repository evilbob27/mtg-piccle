import { useState, useEffect } from "react";
import Square from "./square";

export default function MainSection() {
    const [life, setLife] = useState(20);
    const [showLostGameModal, setShowLostGameModal] = useState(false);
    const [squareGrid, setSquareGrid] = useState(Array.from({ length: 28 }, (_, index) => (
        <Square key={index} showCard={false} />
    )));

    const guessCard = () => {
        setLife(life => {
            const newLife = life - 4;
            if (newLife <= 0) {
                setShowLostGameModal(true);
                return 0;
            }
            return newLife;
        });

        const newSquareGrid = [...squareGrid];
        for (let i = 0; i < 4; i++) {
            const unrevealedSquares = newSquareGrid.filter((square) => square.props.showCard === false && square.key > 3);
            const unrevealedSquareIndex = unrevealedSquares[Math.floor(Math.random() * unrevealedSquares.length)].key;
            newSquareGrid[unrevealedSquareIndex] = <Square key={unrevealedSquareIndex} showCard={true} />;

            if (unrevealedSquares.length === 5) {
                revealAllSquares();
            }
        }
        setSquareGrid(newSquareGrid);
    };

    function revealAllSquares() {
        squareGrid.forEach((square) => {
            newSquareGrid[square.key] = <Square key={square.key} showCard={true} />;
        });
    }

    return (
        <section className="main-section">
            <article className="card-area">
                <img className="card" src="/images/tabernacle-ph.png"></img>
                <div className="hidden-area">
                    {squareGrid}
                </div>
            </article>
            <input className="search-bar" type="search" placeholder="Search Card..."></input>
            <div className="player-section">
                <img className="profile-picture" src="/images/sarkhan-ph.png"></img>
                <p className="life-counter">{life}</p>
            </div>
            {
                showLostGameModal && (<p className="game-over">DEFEAT</p>)
            }
            <button className="life-test" onClick={guessCard}>Guess</button>
        </section>
    );
}