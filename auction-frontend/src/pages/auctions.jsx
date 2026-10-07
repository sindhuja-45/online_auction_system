import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/auctions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch auctions");
        }

        return response.json();
      })
      .then((data) => {
        setAuctions(data);
      })
      .catch(() => {
        setMessage("Cannot connect to server");
      });
  }, []);

  return (
    <div className="auction-page">
      <Navbar />

      <div className="auction-header">
        <h1>Available Auctions</h1>
        <p>Choose an item and place your bid</p>
      </div>

      {message && <p>{message}</p>}

      <div className="auction-grid">

        {auctions.length === 0 ? (
          <p>No auctions available.</p>
        ) : (
          auctions.map((auction) => (
            <div className="auction-card" key={auction._id}>

              <div className="auction-image">
                {auction.image ? (
                  
                <img
                   src={auction.image}
                   alt={auction.title}
                   onError={(e) => {
                     e.target.src =
                        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80";
                     }}
                />
                ) : (
                 <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                    alt="Auction Item"
                 />
                )}
              </div>

              <h2>{auction.title}</h2>

              <p>
                <strong>Category:</strong>{" "}
                {auction.category}
              </p>

              <p>
                <strong>Starting Bid:</strong>{" "}
                ₹{auction.startingBid}
              </p>

              <p className="current-bid">
                Current Bid: ₹{auction.currentBid}
              </p>

              <p>
                 <strong>Status:</strong>{" "}
                   {new Date(auction.endDate) > new Date()
                   ? "ACTIVE"
                   : "ENDED"}
              </p>

              <Link
                to={`/auction/${auction._id}`}
                className="bid-button"
              >
                View Auction
              </Link>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Auctions;