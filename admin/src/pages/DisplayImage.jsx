import React from 'react';
import "./DisplayImage.css";
import { MdClose } from 'react-icons/md';

const DisplayImage = ({ imgUrl, onClose }) => {
    return (
        <div className="display-image-overlay">
            <div className="display-image-content">
                <MdClose className="close-icon" onClick={onClose} />
                <img src={imgUrl} alt="Full Screen View" />
            </div>
        </div>
    );
};

export default DisplayImage;
