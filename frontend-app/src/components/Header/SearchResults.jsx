import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { HomeProduct } from "../pages/listing/HomeProduct";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/api/products/search?q=${query}`
                );
                setProducts(data);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (loading) return <h2>Searching...</h2>;

    return (
        <div className="listing-page">
            <h2 style={{ padding: "20px" }}>
                Search results for: <strong>{query}</strong>
            </h2>

            <HomeProduct
                products={products}
                categoryName="search"
                handleAddToWishlist={() => { }}
                handleAddToCart={() => { }}
            />
        </div>
    );
};

export default SearchResults;
