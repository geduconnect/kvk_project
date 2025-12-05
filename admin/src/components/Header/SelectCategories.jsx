import React, { useState } from 'react'

export const SelectCategories = () => {
    const [isOpenSelect, setIsOpenSelect] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedItem, setSelectedItem] = useState('All Categories')
    const openSelect = () => {
        setIsOpenSelect(!isOpenSelect);
    }
    const closeSelect = (index, name) => {
        setSelectedIndex(index)
        setIsOpenSelect(false);
        setSelectedItem(name)

    }
    return (
        <div className='selectDropWrapper'>
            <span className='openselect' onClick={openSelect}>{selectedItem}</span>
            {isOpenSelect === true &&
                <div className="selectDrop">

                    <div className="searchField">
                        <input type="text" />
                    </div>
                    <ul className='searchResults'>
                        <li onClick={() => closeSelect(0, 'All Categories')} className={`${selectedIndex === 0 ? 'active' : ''}`}>
                            All Categories
                        </li>
                        <li onClick={() => closeSelect(1, 'Kitchen')} className={`${selectedIndex === 1 ? 'active' : ''}`}>
                            Kitchen
                        </li>
                        <li onClick={() => closeSelect(2, 'SmartPhones')} className={`${selectedIndex === 2 ? 'active' : ''}`}>
                            SmartPhones
                        </li>
                        <li onClick={() => closeSelect(3, 'Study')} className={`${selectedIndex === 3 ? 'active' : ''}`}>
                            Study
                        </li>
                        <li onClick={() => closeSelect(4, 'Office')} className={`${selectedIndex === 4 ? 'active' : ''}`}>
                            Office
                        </li>
                        <li onClick={() => closeSelect(5, 'Electroller')} className={`${selectedIndex == 5 ? 'active' : ''}`}>
                            Electroller
                        </li>
                        <li onClick={() => closeSelect(6, 'MobileAccessories')} className={`${selectedIndex == 6 ? 'active' : ''}`}>
                            Mobile Accessories
                        </li>
                        <li onClick={() => closeSelect(7, 'Furniture')} className={`${selectedIndex == 7 ? 'active' : ''}`}>
                            Furniture
                        </li>
                        <li onClick={() => closeSelect(8, 'Clothing')} className={`${selectedIndex == 8 ? 'active' : ''}`}>
                            Clothing
                        </li>
                        <li onClick={() => closeSelect(9, 'Computers')} className={`${selectedIndex == 9 ? 'active' : ''}`}>
                            Computers
                        </li>
                    </ul>
                </div>

            }
        </div >
    )
}
