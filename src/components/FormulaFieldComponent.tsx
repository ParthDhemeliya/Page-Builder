import React from 'react';
import { PageComponent } from '../types';

interface FormulaFieldComponentProps {
  component: PageComponent;
}

const FormulaFieldComponent: React.FC<FormulaFieldComponentProps> = ({ component }) => {
  return (
    <div className="formula-field-component" style={component.attributes.style}>
      <label>{component.attributes.label || 'Formula Field'}</label>
      <input 
        type="text" 
        placeholder="Enter formula expression"
        defaultValue={component.attributes.formulaExpression || ''}
        onChange={(e) => console.log(`Formula field ${component.id} value:`, e.target.value)}
      />
    </div>
  );
};

export default FormulaFieldComponent;
