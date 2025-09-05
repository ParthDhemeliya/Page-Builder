import React from 'react';
import type { PageComponent, Dataset } from '../types';
import { replaceDatasetKeys } from '../utils/datasetUtils';

interface Props {
  component: PageComponent;
  dataset?: Dataset | null;
}

const NumberFieldComponent: React.FC<Props> = ({ component, dataset }) => {
  const label = component.attributes.label || 'Number';
  const datasetKey = component.attributes.datasetKey || '';

  // Replace dataset keys in label
  const displayLabel = replaceDatasetKeys(label, dataset || {});

  // Get value: either from dataset (if datasetKey exists) or from custom value
  let displayValue = '';
  if (datasetKey && dataset && dataset[datasetKey] !== undefined) {
    // Show value from JSON dataset
    displayValue = String(dataset[datasetKey]);
  } else if (datasetKey) {
    // Show the datasetKey text if no dataset or key not found
    displayValue = datasetKey;
  } else {
    // Show custom value if no datasetKey
    displayValue = component.attributes.customValue || '';
  }

  return (
    <div className="number-field-component" style={component.attributes.style}>
      <label>{displayLabel}</label>
      <div
        className="number-display"
        style={{
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          backgroundColor: '#f9fafb',
          color: '#374151',
          fontSize: '16px',
          minHeight: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {displayValue || 'No value'}
      </div>
    </div>
  );
};

export default NumberFieldComponent;
