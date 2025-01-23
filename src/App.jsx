import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorResForm from "./components/items/vendorResForm";
import ItemsPage from "./components/items/ItemsPage";
import ItemsEntry from "./components/items/ItemsEntry";
import ItemsSummary from "./components/items/ItemsSummary";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/items-entry" element={<ItemsEntry />} />
        <Route path="/items-summary" element={<ItemsSummary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
