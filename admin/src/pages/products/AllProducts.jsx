import React, { useState, useEffect } from 'react';
// import { UploadProduct } from './UploadProduct';
// import { MdDelete, MdEdit } from 'react-icons/md';
import { ProductTable } from './ProductTable';

export const AllProducts = () => {
    // const fetchProductsUrl = "http://localhost:8000/api/products"; // Ensure this is the correct API URL
    // const [products, setProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [openUploadProduct, setOpenUploadProduct] = useState(false);

    // const fetchProducts = async () => {
    //     setIsLoading(true);
    //     setError(null);

    //     try {
    //         const response = await fetch(fetchProductsUrl);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch products.');
    //         }
    //         const data = await response.json();
    //         setProducts(data.products || []);
    //     } catch (err) {
    //         setError(err.message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const handleDelete = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this product?')) {
    //         try {
    //             const response = await fetch(`${fetchProductsUrl}/${id}`, {
    //                 method: 'DELETE',
    //             });
    //             const data = await response.json();

    //             if (data.success) {
    //                 fetchProducts();
    //             } else {
    //                 alert(data.message || 'Failed to delete product.');
    //             }
    //         } catch (err) {
    //             console.error(err.message);
    //             alert('An error occurred while deleting the product.');
    //         }
    //     }
    // };

    // const handleEdit = (id) => {
    //     console.log(`Edit product with ID: ${id}`);
    //     // Add logic to navigate to the edit page or open an edit modal
    // };

    // useEffect(() => {
    //     fetchProducts();
    // }, [fetchProductsUrl]);

    // if (isLoading) {
    //     return <div className="loading">Loading...</div>;
    // }

    // if (error) {
    //     return <div className="error">{error}</div>;
    // }

    return (
        <div className="all-adminproducts">
            <div className="adminproduct-head">
                <span className="adminproduct-head-left">
                    <h2>All Products</h2>
                </span>
                <span className="adminproduct-head-right">
                    <Link to="/add-product">
                        <button
                            className="upload-btn">
                            + Add Product
                        </button>
                    </Link>
                </span>
            </div>

            

            <div className="adminproduct-body">
                <div className="adminproduct-search">
                    <form>
                        <i className="fa fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search products..."
                        // Optional: add search functionality if needed
                        />
                    </form>
                </div>
                <ProductTable products={products} />

                
            </div>
        </div>
    );
};
