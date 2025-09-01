import React from 'react';
import type { PageComponent } from '../types';

interface ButtonComponentProps {
  component: PageComponent;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ component }) => {
  const handleButtonClick = () => {
    console.log('Button clicked:', component.id, component.attributes.label);
    console.log('Button details:', component);
  };

  return (
    <button
      className="button-component"
      style={component.attributes.style}
      onClick={handleButtonClick}
    >
      {component.attributes.label || 'Button'}
    </button>
  );
};

export default ButtonComponent;
