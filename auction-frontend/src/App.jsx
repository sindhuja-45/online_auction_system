import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Auctions from "./pages/auctions";
import AuctionDetails from "./pages/auctionDetails";
import CreateAuction from "./pages/createAuction";
import Profile from "./pages/profile.jsx";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/auctions" element={<Auctions />} />

        <Route
          path="/auction/:id"
          element={<AuctionDetails />}
        />

        <Route
          path="/create-auction"
          element={<CreateAuction />}
        />

        <Route path="/profile" element={<Profile />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;