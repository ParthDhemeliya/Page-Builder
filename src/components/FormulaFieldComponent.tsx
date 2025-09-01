import React from 'react';
import type { PageComponent, Dataset } from '../types';
import { evaluateFormula, formatFormulaDisplay } from '../utils/formulaUtils';

interface FormulaFieldComponentProps {
  component: PageComponent;
  dataset?: Dataset | null;
}

const FormulaFieldComponent: React.FC<FormulaFieldComponentProps> = ({
  component,
  dataset,
}) => {
  const formulaExpression = component.attributes.formulaExpression || '';
  const formulaResult = evaluateFormula(formulaExpression, dataset || {});
  const displayFormula = formatFormulaDisplay(formulaExpression, dataset || {});

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Formula changed:', component.id, value);
    console.log('Field details:', component);
  };

  return (
    <div className="formula-field-component" style={component.attributes.style}>
      <label>{component.attributes.label || 'Formula Result'}</label>

      <div className="formula-display">
        <div className="formula-expression">
          <span className="formula-label">Formula:</span>
          <span className="formula-text">{displayFormula || 'No formula'}</span>
        </div>

        <div className="formula-result">
          <span className="result-label">Result:</span>
          {formulaResult.success ? (
            <span className="result-value">{formulaResult.result}</span>
          ) : (
            <span className="result-error">
              {formulaResult.error || 'Invalid formula'}
            </span>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Enter formula (e.g., {price} * {quantity})"
        defaultValue={formulaExpression}
        onChange={handleFormulaChange}
        className="formula-input"
      />
    </div>
  );
};

export default FormulaFieldComponent;
