import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className = '', children }) => {
  return (
    <button
      onClick={onClick}
      className={`font-semibold py-2 px-4 rounded-lg transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
