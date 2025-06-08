// src/components/ConfirmModal.js
import React from "react";
import "../styles.css";

const ConfirmModal = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>Potvrdi</button>
          <button className="modal-cancel" onClick={onCancel}>Odustani</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
