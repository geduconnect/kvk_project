import axios from "axios";
import { useState, useEffect } from "react";

export const SelectCategories = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState({ id: "", name: "All Categories" });

  // ✅ Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories");
        const allCats = [{ id: "", name: "All Categories" }, ...data];
        setCategories(allCats);
        setFiltered(allCats);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleSelect = () => setIsOpen(!isOpen);

  const handleSelect = (cat) => {
    setSelected(cat);
    setIsOpen(false);
    if (onSelect) onSelect(cat);
  };

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const list = categories.filter((cat) =>
      cat.name.toLowerCase().includes(keyword)
    );
    setFiltered(list);
  };

  return (
    <div className="selectDropWrapper">
      {/* Selected Category */}
      <span className="openselect" onClick={toggleSelect}>
        {selected.name.length > 14
          ? selected.name.substring(0, 14) + "..."
          : selected.name}
      </span>

      {isOpen && (
        <div className="selectDrop">
          {/* Search Box */}
          <div className="searchField">
            <input
              type="text"
              placeholder="Search Categories..."
              onChange={handleFilter}
            />
          </div>

          {/* List */}
          <ul className="searchResults">
            {filtered.map((cat) => (
              <li
                key={cat.id || cat.name}
                onClick={() => handleSelect(cat)}
                className={selected.id === cat.id ? "active" : ""}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
