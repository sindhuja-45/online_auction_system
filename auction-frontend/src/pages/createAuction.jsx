import { useState } from "react";
import Navbar from "../components/Navbar";

function CreateAuction() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [image, setImage] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateAuction = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user) {
      setMessage("Please login first");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auctions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description,
            category,
            startingBid: Number(startingBid),
            image,
            endDate
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Auction created successfully!");

        setTitle("");
        setDescription("");
        setCategory("");
        setStartingBid("");
        setImage("");
        setEndDate("");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Cannot connect to server");
    }
  };

  return (
    <div className="create-page">
      <Navbar />

      <div className="create-container">
        <h1>Create Auction</h1>
        <p>Sell your item by creating an auction.</p>

        <form onSubmit={handleCreateAuction}>

          <input
            type="text"
            placeholder="Item Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Item Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Gaming">Gaming</option>
            <option value="Furniture">Furniture</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Starting Bid"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label>Auction End Date</label>

          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <button type="submit">
            Create Auction
          </button>

        </form>

        {message && (
          <p className="bid-message">{message}</p>
        )}
      </div>
    </div>
  );
}

export default CreateAuction;