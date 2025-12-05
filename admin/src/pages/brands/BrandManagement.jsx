import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';

export const BrandManagement = () => {
    const [brands, setBrands] = useState([]); // Initialize state here

    return (
        <>
             <Outlet context={{ brands, setBrands }} />
        </>
    );
};
