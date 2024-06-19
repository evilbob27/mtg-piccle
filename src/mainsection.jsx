export default function MainSection() {
    return (

        <section className="main-section">
            <img className="card" src="/images/tabernacle-ph.png"></img>
            <input className="search-bar" type="search" placeholder="Search Card..."></input>
            <div className="player-section">
                <img className="profile-picture" src="/images/sarkhan-ph.png"></img>
                <p className="life-counter">20</p>
            </div>
        </section>

    );
}