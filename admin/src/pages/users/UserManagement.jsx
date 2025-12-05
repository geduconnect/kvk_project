import React, { useState } from 'react';
import "./AllUser.css"
import { Outlet } from 'react-router-dom';

export const UserManagement = () => {
   const [users, setUsers] = useState([]); // Initialize state here

    return (
        <>
             <Outlet context={{ users, setUsers }} />
        </>
    );
};
