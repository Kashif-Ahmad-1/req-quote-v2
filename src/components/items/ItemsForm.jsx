import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ItemsEntry({ onItemsChange, closeModal }) {
  const [items, setItems] = useState([{}]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect query parameters
    const queryParams = items
      .map((item, index) => {
        return `item${index + 1}=id=${encodeURIComponent(
          item.id
        )}&itemName=${encodeURIComponent(
          item.itemName
        )}&units=${encodeURIComponent(item.units)}&rate=${encodeURIComponent(
          item.itemRate || ""
        )}`;
      })
      .join("&");

    // Navigate with the query params
    const url = `/vendor?${queryParams}`;
    navigate(url);
  };

  const addItem = () => {
    setItems([...items, { itemName: "", units: "", itemRate: "" }]);
    setTimeout(() => {
      inputRefs.current[items.length].focus();
    }, 0);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-3 w-fit rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 rounded-lg w-full mx-auto"
        >
          <h2 className="text-2xl mb-4 font-semibold text-indigo-600">
            Add Items
          </h2>

          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-2 rounded-md shadow-sm mb-2"
            >
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                placeholder="Item Name"
                value={item.itemName}
                required
                onChange={(e) =>
                  handleChange(index, "itemName", e.target.value)
                }
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Units"
                value={item.units}
                required
                onChange={(e) => handleChange(index, "units", e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Item Rate"
                value={item.itemRate}
                onChange={(e) =>
                  handleChange(index, "itemRate", e.target.value)
                }
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
            <button
              type="button"
              className="px-6 py-3 bg-blue-500 text-white"
              onClick={addItem}
            >
              <FaPlus />
            </button>
            <button
              type="submit"
              className="!bg-indigo-600 text-white px-6 py-2 rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Submit
            </button>
            <button
              onClick={closeModal}
              className="!bg-gray-500 text-white px-6 py-2 rounded-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemsEntry;
