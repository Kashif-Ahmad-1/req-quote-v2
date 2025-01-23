import { useLocation } from "react-router-dom";
import { useState } from "react";

const ItemsSummary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const items = [];
  let i = 1;
  
  // Parse each item query parameter correctly
  while (queryParams.has(`item${i}Name`)) {
    const item = {
      itemName: decodeURIComponent(queryParams.get(`item${i}Name`)),
      units: decodeURIComponent(queryParams.get(`item${i}Units`)),
      itemRate: decodeURIComponent(queryParams.get(`item${i}Rate`)) || ""  // Default to an empty string if no rate is provided
    };

    items.push(item);
    i++; // Move to the next item
  }

  const [editableItems, setEditableItems] = useState(items);

  const handleRateChange = (index, newRate) => {
    const updatedItems = [...editableItems];
    updatedItems[index].itemRate = newRate;
    setEditableItems(updatedItems);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableItems),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Items saved successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting items:", error);
      alert("Failed to save items.");
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Item Summary</h2>
      
      <div className="space-y-4">
        {editableItems.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col">
                  <label className="font-medium text-gray-600">Item Name</label>
                  <input
                    type="text"
                    value={item.itemName}
                    readOnly
                    className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-600">Units</label>
                  <input
                    type="text"
                    value={item.units}
                    readOnly
                    className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-600">Rate</label>
                  <input
                    type="text"
                    value={item.itemRate}
                    onChange={(e) => handleRateChange(index, e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ItemsSummary;
