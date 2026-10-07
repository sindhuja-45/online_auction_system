import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AuctionDetails() {
  const { id } = useParams();

  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/auctions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAuction(data);
      })
      .catch(() => {
        setMessage("Cannot connect to server");
      });
  }, [id]);

  const placeBid = async () => {
    const bidAmount = Number(bid);

    if (!bidAmount) {
      setMessage("Please enter a bid amount.");
      return;
    }

    if (bidAmount <= auction.currentBid) {
      setMessage("Your bid must be higher than the current bid.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/bids/place",
        {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            auctionId: id,
            amount: bidAmount
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAuction({
          ...auction,
          currentBid: bidAmount
        });

        setMessage("Bid placed successfully!");
        setBid("");
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      setMessage("Cannot connect to server");
    }
  };

  if (!auction) {
    return (
      <div>
        <Navbar />

        <div className="details-container">
          <h2>Loading auction...</h2>

          {message && <p>{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Navbar />

      <div className="details-container">

        <div className="product-image">
          {auction.image ? (
            <img
              src={auction.image}
              alt={auction.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          ) : (
            <span>💻</span>
          )}
        </div>

        <div className="product-details">

          <h1>{auction.title}</h1>

          <p>
            <strong>Auction ID:</strong> {auction._id}
          </p>

          <p>
            <strong>Category:</strong> {auction.category}
          </p>

          <p>
            <strong>Description:</strong>
            <br />
            {auction.description}
          </p>

          <p>
            <strong>Starting Bid:</strong>{" "}
            ₹{auction.startingBid.toLocaleString()}
          </p>

          <p className="current-price">
            Current Bid: ₹{auction.currentBid.toLocaleString()}
          </p>

          <p>
            <strong>End Date:</strong>{" "}
            {new Date(auction.endDate).toLocaleString()}
          </p>
          
          <p>
            <strong>Status:</strong>{" "}
            {new Date(auction.endDate) > new Date()
              ? "ACTIVE"
              : "ENDED"}
          </p> 

          <div className="bid-section">

            <h3>Place Your Bid</h3>

            <input
              type="number"
              placeholder="Enter bid amount"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />

            <button
                  onClick={placeBid}
                  disabled={new Date(auction.endDate) <= new Date()}
            >
              {new Date(auction.endDate) <= new Date()
                ? "Auction Ended"
                : "Place Bid"}
            </button>

            {message && (
              <p className="bid-message">
                {message}
              </p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default AuctionDetails;