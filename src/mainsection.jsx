import { useState } from "react";

export default function MainSection() {
    const [life, setLife] = useState(20);
    const [showLostGameModal, setShowLostGameModal] = useState(false);
    const guessCard = () => {
        setLife(life => {
            const newLife = life - 4;
            if (newLife <= 0) {
                setShowLostGameModal(true);
                return 0;
            }
            return newLife;
        });
    };

    return (
        <section className="main-section">
            <img className="card" src="/images/tabernacle-ph.png"></img>
            <input className="search-bar" type="search" placeholder="Search Card..."></input>
            <div className="player-section">
                <img className="profile-picture" src="/images/sarkhan-ph.png"></img>
                <p className="life-counter">{life}</p>
            </div>
            {
                showLostGameModal && (<p className="game-over">DEFEAT</p>)
            }

            <button className="life-test" onClick={guessCard}></button>
        </section>
    );
}