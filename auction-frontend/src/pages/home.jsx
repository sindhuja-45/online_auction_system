import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <section className="welcome">
        <div className="welcome-content">
          <h1>Welcome to Online Auction</h1>

          <p>
            Discover amazing products, place your bids,
            and win items at the price you choose.
          </p>

          <div className="home-buttons">
            <Link to="/auctions" className="home-button">
              Browse Auctions
            </Link>

            <Link to="/create-auction" className="home-button secondary">
              Sell an Item
            </Link>
          </div>
        </div>
      </section>

      <section className="home-features">

        <div className="feature-card">
          <div className="feature-icon">🔎</div>
          <h2>Find Great Items</h2>
          <p>
            Explore products from different categories
            and discover items you like.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h2>Place Your Bid</h2>
          <p>
            Enter your bid and compete with other
            users for your favorite items.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h2>Win Auctions</h2>
          <p>
            Keep track of your bids and win items
            when the auction ends.
          </p>
        </div>

      </section>
    </div>
  );
}

export default Home;