import React from 'react';
import type { PageComponent } from '../types';

interface NumberFieldComponentProps {
  component: PageComponent;
}

const NumberFieldComponent: React.FC<NumberFieldComponentProps> = ({
  component,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Number changed:', component.id, value);
    console.log('Field details:', component);
  };

  return (
    <div className="number-field-component" style={component.attributes.style}>
      <label>{component.attributes.label || 'Enter a number'}</label>
      <input
        type="number"
        placeholder="Type a number here"
        onChange={handleNumberChange}
      />
    </div>
  );
};

export default NumberFieldComponent;
