import React from 'react';
import type { PageComponent } from '../types';

interface FormulaFieldComponentProps {
  component: PageComponent;
}

const FormulaFieldComponent: React.FC<FormulaFieldComponentProps> = ({
  component,
}) => {
  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Formula changed:', component.id, value);
    console.log('Field details:', component);
  };

  return (
    <div className="formula-field-component" style={component.attributes.style}>
      <label>{component.attributes.label || 'Enter a formula'}</label>
      <input
        type="text"
        placeholder="Type your formula here"
        defaultValue={component.attributes.formulaExpression || ''}
        onChange={handleFormulaChange}
      />
    </div>
  );
};

export default FormulaFieldComponent;
