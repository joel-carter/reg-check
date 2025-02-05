import React from 'react';
import './CarRegInput.css'; // Import component-specific styles

interface CarRegInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CarRegInput: React.FC<CarRegInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="reg-input"
      placeholder="ENTER REG"
      value={value}
      onChange={onChange}
      maxLength={8}
      required
    />
  );
};

export default CarRegInput;