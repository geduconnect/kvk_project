import React, { useState } from 'react';
import "./AllCustomer.css"
import { Outlet } from 'react-router-dom';

export const CustomerManagement = () => {
 const [customers, setCustomers] = useState([]); // Initialize state here

    return (
        <>
             <Outlet context={{ customers, setCustomers }} />
        </>
    );
};
