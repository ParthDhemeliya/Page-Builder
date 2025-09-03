import React from 'react';
import type { PageComponent } from '../types';

interface Props {
  component: PageComponent;
}

const NumberFieldComponent: React.FC<Props> = ({ component }) => {
  // handle number input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Number changed:', e.target.value);
  };

  return (
    <div className="number-field-component" style={component.attributes.style}>
      <label>{component.attributes.label || 'Number'}</label>
      <input
        type="number"
        placeholder="Enter number"
        onChange={handleChange}
        style={{ color: '#007bff' }}
      />
    </div>
  );
};

export default NumberFieldComponent;
