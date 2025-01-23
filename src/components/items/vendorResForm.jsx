import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
function VendorResForm() {
  const location = useLocation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fetchedItems = [];

    for (let i = 1; ; i++) {
      const id = params.get(`item${i}id`);
      if (!id) break; // If there's no more item, stop the loop
      fetchedItems.push({
        id: id,
        itemName: params.get(`item${i}itemName`),
        units: params.get(`item${i}units`),
        itemRate: params.get(`item${i}rate`),
      });
    }

    setItems(fetchedItems);
  }, [location]);

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle the submission logic
  };

  return (
    <div className="bg-white p-3 w-fit rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2 rounded-lg w-full mx-auto"
      >
        <h2 className="text-2xl mb-4 font-semibold text-indigo-600">
          Vendor Rates
        </h2>

        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-2 rounded-md shadow-sm mb-2"
          >
            <input
              type="text"
              placeholder="Item Name"
              value={item.itemName}
              disabled
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60 bg-gray-200"
            />
            <input
              type="text"
              placeholder="Units"
              value={item.units}
              disabled
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60 bg-gray-200"
            />
            <input
              type="text"
              placeholder="Item Rate"
              value={item.itemRate}
              onChange={(e) => handleChange(index, "itemRate", e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => removeItem(index)}
              className="!text-red-600 hover:text-red-800 font-bold !bg-transparent"
            >
              <IoMdClose size={20} />
            </button>
          </div>
        ))}

        <div className="flex justify-end mt-4 gap-4 items-center sticky bottom-0 bg-white py-2">
          <button type="button" className="px-6 py-3 bg-blue-500 text-white">
            <FaPlus />
          </button>
          <button
            type="submit"
            className="!bg-indigo-600 text-white px-6 py-2 rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default VendorResForm;
