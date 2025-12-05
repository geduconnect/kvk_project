import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import "./Allorders.css";

export const OrderManagement = () => {
    const [orders, setOrders] = useState([]); // Initialize state here

    return (
        <>
             <Outlet context={{ orders, setOrders }} />
        </>
    );
};
