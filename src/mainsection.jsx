import { useState, useEffect } from "react";

export default function MainSection() {
    const [life, setLife] = useState(20);
    const [showLostGameModal, setShowLostGameModal] = useState(false);
    const [grid, setGrid] = useState([]);
    const [hiddenSquares, setHiddenSquares] = useState([]);

    const guessCard = () => {
        setLife(life => {
            const newLife = life - 4;
            if (newLife <= 0) {
                setShowLostGameModal(true);
                return 0;
            }
            return newLife;
        });

        const newHiddenSquares = [...hiddenSquares];
        for (let i = 0; i < 4; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 24);
            } while (newHiddenSquares.includes(randomIndex));
            newHiddenSquares.push(randomIndex);
        }

        setHiddenSquares(newHiddenSquares);
    };

useEffect(() => {
    const generateGrid = () => {
        const newGrid = [];
        for (let i = 0; i < 24; i++) {
            newGrid.push(<div key={i} className={`square overlay-square ${hiddenSquares.includes(i) ? `active` : ``}`}></div>);
        }
        setGrid(newGrid);
    };

    generateGrid();
}, [hiddenSquares]);

useEffect(() => {
    if (showLostGameModal) {
        setGrid([]);
    }
}, [showLostGameModal]);

return (
    <section className="main-section">
        <article className="card-area">
            <img className="card" src="/images/tabernacle-ph.png"></img>
            <div className="hidden-area">
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                {grid}
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