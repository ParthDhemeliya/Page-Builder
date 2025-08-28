import React from 'react';
import { PageComponent } from '../types';

interface ButtonComponentProps {
  component: PageComponent;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ component }) => {
  return (
    <button 
      className="button-component" 
      style={component.attributes.style}
      onClick={() => console.log(`Button ${component.id} clicked`)}
    >
      {component.attributes.label || 'Button'}
    </button>
  );
};

export default ButtonComponent;
