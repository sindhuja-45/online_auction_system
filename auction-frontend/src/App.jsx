import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auctions from "./pages/Auctions";
import AuctionDetails from "./pages/AuctionDetails";
import CreateAuction from "./pages/CreateAuction";
import Profile from "./pages/Profile";

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