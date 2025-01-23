import { useState } from "react";
import ItemsForm from "./ItemsForm";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";

function ItemsPage() {
  const [items, setItems] = useState([
    {
      id: "it-001",
      itemName: "Spinner",
      units: "Nos",
    },
    {
      id: "it-002",
      itemName: "Widget",
      units: "Nos",
    },
  ]);

  const clientDetails = [
    {
      name: "Cilicon extruders",
      itemAndRates: [
        {
          id: "it-001",
          rate: "100",
        },
        {
          id: "it-002",
          rate: "98",
        },
      ],
    },
    {
      name: "Mangla extruders",
      itemAndRates: [
        {
          id: "it-001",
          rate: "97",
        },
        {
          id: "it-002",
          rate: "87",
        },
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredItems = items.filter((item) =>
    [item.itemName].join(" ").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const paginatedItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handleAddItems = (newItems) => {
    const itemsWithIds = newItems.map((item) => ({
      ...item,
      id: `ITM-${Math.floor(100000 + Math.random() * 900000)}`, // Generate a 6-digit random ID
    }));

    setItems((prev) => [...prev, ...itemsWithIds]);
    setIsModalOpen(false);
    toast.success("Items added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <ToastContainer />

      {isModalOpen && (
        <ItemsForm
          onItemsChange={handleAddItems}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Add Items
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Item ID
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Item Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">Units</th>
              {/* Render client names as columns */}
              {clientDetails.map((client) => (
                <th
                  key={client.name}
                  className="px-6 py-3 text-left font-medium text-sm"
                >
                  {client.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No items found
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 border border-t-gray-300"
                >
                  <td className="px-3 py-2 text-sm">{item.id}</td>
                  <td className="px-3 py-2 text-sm">{item.itemName}</td>
                  <td className="px-3 py-2 text-sm">{item.units}</td>
                  {/* Render rates based on client and item id */}
                  {clientDetails.map((client) => {
                    const rateData = client.itemAndRates.find(
                      (rate) => rate.id === item.id
                    );
                    return (
                      <td key={client.name} className="px-3 py-2 text-sm">
                        {rateData ? rateData.rate : "N/A"}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-800 font-semibold">
          {filteredItems.length} entries found
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          previousLabel={
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Prev
            </span>
          }
          nextLabel={
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Next
            </span>
          }
          activeClassName="bg-indigo-600 text-white font-semibold px-2 rounded-sm transition-all"
          disabledClassName="text-gray-400 cursor-not-allowed"
          pageClassName="px-2 rounded-sm text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all"
          breakClassName="text-gray-600"
        />
      </div>
    </div>
  );
}

export default ItemsPage;
