import React from 'react';
import type { PageComponent, Dataset } from '../types';
import { evaluateFormula, formatFormulaDisplay } from '../utils/formulaUtils';

interface Props {
  component: PageComponent;
  dataset?: Dataset | null;
}

const FormulaFieldComponent: React.FC<Props> = ({ component, dataset }) => {
  const formula = component.attributes.formulaExpression || '';
  // evaluate formula with dataset values
  const result = evaluateFormula(formula, dataset || {});
  // format formula for display
  const display = formatFormulaDisplay(formula, dataset || {});

  // handle formula input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Formula changed:', e.target.value);
  };

  return (
    <div className="formula-field-component" style={component.attributes.style}>
      <label>{component.attributes.label || 'Formula Result'}</label>

      <div className="formula-display">
        <div className="formula-expression">
          <span className="formula-label">Formula:</span>
          <span className="formula-text">{display || 'No formula'}</span>
        </div>

        <div className="formula-result">
          <span className="result-label">Result:</span>
          {result.success ? (
            <span className="result-value">{result.result}</span>
          ) : (
            <span className="result-error">
              {result.error || 'Invalid formula'}
            </span>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Enter formula (e.g., {price} * {quantity})"
        defaultValue={formula}
        onChange={handleChange}
        className="formula-input"
        style={{ color: '#007bff' }}
      />
    </div>
  );
};

export default FormulaFieldComponent;
