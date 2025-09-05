import React from 'react';
import type { PageComponent, Dataset } from '../types';
import { evaluateFormula, formatFormulaDisplay } from '../utils/formulaUtils';

interface Props {
  component: PageComponent;
  dataset?: Dataset | null;
  onUpdateComponent?: (updatedComponent: PageComponent) => void;
}

const FormulaFieldComponent: React.FC<Props> = ({ component, dataset }) => {
  const formula = component.attributes.formulaExpression || '';
  const result = evaluateFormula(formula, dataset || {});
  const display = formatFormulaDisplay(formula, dataset || {});

  // Extract individual variables from the formula
  const extractVariables = (formula: string, dataset: Dataset) => {
    const variables: { [key: string]: string | number | boolean } = {};

    // Find all {key} patterns in the formula
    const matches = formula.match(/\{([^}]+)\}/g);
    if (matches) {
      matches.forEach(match => {
        const key = match.slice(1, -1); // Remove { and }

        // Handle complex expressions like "price * quantity"
        if (
          key.includes('*') ||
          key.includes('+') ||
          key.includes('-') ||
          key.includes('/')
        ) {
          // Split by operators and extract individual keys
          const keys = key
            .split(/[*+\-/]/)
            .map(k => k.trim())
            .filter(k => k && !/^\d/.test(k));
          keys.forEach(k => {
            if (dataset[k] !== undefined) {
              variables[k] = dataset[k];
            }
          });
        } else {
          // Simple key
          if (dataset[key] !== undefined) {
            variables[key] = dataset[key];
          }
        }
      });
    }

    return variables;
  };

  const variables = extractVariables(formula, dataset || {});
  // Clean the label to remove any formula expressions
  const cleanLabel = (component.attributes.label || 'Total').replace(
    /\s*:\s*\{[^}]+\}.*$/,
    ''
  );

  return (
    <div className="formula-field-component" style={component.attributes.style}>
      <div className="formula-breakdown">
        <div
          className="formula-title"
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#374151',
          }}
        >
          {cleanLabel}
        </div>

        {/* Show individual variables */}
        {Object.keys(variables).length > 0 && (
          <div className="variables-list" style={{ marginBottom: '10px' }}>
            {Object.entries(variables).map(([key, value]) => (
              <div
                key={key}
                style={{
                  marginBottom: '5px',
                  fontSize: '14px',
                  color: '#6b7280',
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} = {String(value)}
              </div>
            ))}
          </div>
        )}

        {/* Show the calculation */}
        {display && (
          <div
            className="formula-calculation"
            style={{
              marginBottom: '10px',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Formula: {display}
          </div>
        )}

        {/* Show result */}
        <div
          className="formula-result"
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1f2937',
            padding: '8px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
          }}
        >
          {result.success ? (
            <span>Total Pay = {result.result}</span>
          ) : (
            <span style={{ color: '#dc2626' }}>
              {result.error || 'Invalid formula'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaFieldComponent;
