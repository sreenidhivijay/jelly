import React, { useState } from 'react';
import './CustomDropdown.css';

function CustomDropdown({ label, options, selectedItems, onAddItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onAddItem(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {label} <span className="dropdown-arrow"></span>
      </button>
      {isOpen && (
        <div className="dropdown-list">
          {options.filter(option => !selectedItems.includes(option)).map((option, index) => (
            <div key={index} className="dropdown-item" onClick={() => handleSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
