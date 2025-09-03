import React from 'react';
import type { PageComponent } from '../types';

interface Props {
  component: PageComponent;
}

const ButtonComponent: React.FC<Props> = ({ component }) => {
  // handle button click
  const handleClick = () => {
    console.log('Button clicked:', component.attributes.label);
  };

  return (
    <button
      className="button-component"
      style={component.attributes.style}
      onClick={handleClick}
    >
      {component.attributes.label || 'Button'}
    </button>
  );
};

export default ButtonComponent;
