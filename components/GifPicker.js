import React, { useEffect, useState } from "react";
import axios from "axios";

const GifPicker = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    // Debounce search to avoid too many API calls while typing
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setGifs([]); // Clear results if search term is cleared
      }
    }, 300); // 300ms delay for debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const apiKey = "3n2QMy4su7aGDZjWN5VDRJTb16u5wIgo"; // Use your Giphy API key
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10`;
      const response = await axios.get(url);
      setGifs(response.data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search GIFs"
        className="bg-black text-white  border rounded-lg h-7 text-sm px-2"
      />

      <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-4">
        {gifs.map((gif) => (
          <div key={gif.id} className="w-full h-full ">
            <img
              src={gif.images.fixed_height.url}
              alt={gif.title}
              onClick={() => onSelect(gif)}
              className="w-full h-auto object-cover cursor-pointer"
              // Tailwind CSS classes for responsiveness and maintaining aspect ratio
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifPicker;

{
  /* <button className="text-gray-400 ml-1" onClick={handleSearch}>
        Search
      </button> */
}
{
  /* <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            onClick={() => onSelect(gif)}
            style={{
              cursor: "pointer",
              width: "30%",
              height: "auto",
              margin: "5px",
            }}
          />
        ))}
      </div> */
}
