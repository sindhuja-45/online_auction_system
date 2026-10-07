import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    fetch(`http://localhost:5000/api/profile/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setProfile(data);
        } else {
          setMessage(data.message);
        }
      })
      .catch(() => {
        setMessage("Cannot connect to server");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (message) {
    return (
      <div>
        <Navbar />
        <div className="profile-container">
          <h2>{message}</h2>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <Navbar />
        <div className="profile-container">
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">

        <div className="profile-header">
          <h1>{profile.user.name}</h1>
          <p>{profile.user.email}</p>

          <button onClick={logout}>
            Logout
          </button>
        </div>

        <div className="profile-stats">

          <div className="stat-card">
            <h2>{profile.auctions.length}</h2>
            <p>My Auctions</p>
          </div>

          <div className="stat-card">
            <h2>{profile.bids.length}</h2>
            <p>My Bids</p>
          </div>

        </div>

        <div className="profile-section">

          <h2>My Auctions</h2>

          {profile.auctions.length === 0 ? (
            <p>You have not created any auctions.</p>
          ) : (
            profile.auctions.map((auction) => (
              <div className="profile-item" key={auction._id}>
                <h3>{auction.title}</h3>

                <p>
                  Starting Bid: ₹{auction.startingBid}
                </p>

                <p>
                  Current Bid: ₹{auction.currentBid}
                </p>
              </div>
            ))
          )}

        </div>

        <div className="profile-section">

          <h2>My Bids</h2>

          {profile.bids.length === 0 ? (
            <p>You have not placed any bids.</p>
          ) : (
            profile.bids.map((bid) => (
              <div className="profile-item" key={bid._id}>

                <h3>
                  {bid.auction
                    ? bid.auction.title
                    : "Auction"}
                </h3>

                <p>
                  Your Bid: ₹{bid.amount}
                </p>

                {bid.auction && (
                  <p>
                    Current Bid: ₹{bid.auction.currentBid}
                  </p>
                )}

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Profile;