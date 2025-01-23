import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorResForm from "./components/items/vendorResForm";
import ItemsPage from "./components/items/ItemsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ItemsPage />} />
          <Route path="/vendor" element={<VendorResForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
