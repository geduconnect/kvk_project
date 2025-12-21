import { Link } from "react-router-dom";

const CategoriesFilter = ({ categories, products }) => {
  return (
    <div className="sidebar-category-card">
      <h3>Categories</h3>
      <div className="listing-catList">
        {categories.map((cat) => (
          <div key={cat.id} className="listing-catItem">
            <span className="catList-img">
              <img src={`http://localhost:8000${cat.image}`} width={30} />
            </span>
            <Link to={`/products-categories/${cat.name}`}>
              <h4>{cat.name}</h4>
            </Link>

            <span className="catList-stock">
              {products.filter(p => p.category_name === cat.name).length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
