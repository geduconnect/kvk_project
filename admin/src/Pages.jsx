import React from 'react'
import { Outlet } from 'react-router-dom'
// import { Header } from './components/Header/Header'

export const Pages = () => {
    return (
        <>
            {/* <Header /> */}
            <main>
                <Outlet />
            </main>
        </>

    )
}
