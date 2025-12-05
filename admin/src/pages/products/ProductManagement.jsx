import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import "./ProductTable.css"

export const ProductManagement = () => {
    const [products, setProducts] = useState([]); // Initialize state here

    return (
        <>
             <Outlet context={{ products, setProducts }} />
        </>
    );
};
