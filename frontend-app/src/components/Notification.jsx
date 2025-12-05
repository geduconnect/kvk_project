import React, { useEffect } from "react";
import "./Notification.css";

export const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
    </div>
  );
};
