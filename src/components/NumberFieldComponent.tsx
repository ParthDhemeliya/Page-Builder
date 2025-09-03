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

  // Get the value from dataset if datasetKey is provided
  const datasetValue = datasetKey && dataset ? dataset[datasetKey] : '';
  const displayValue = datasetValue !== undefined ? String(datasetValue) : '';

  // handle number input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Number changed:', e.target.value);
  };

  return (
    <div className="number-field-component" style={component.attributes.style}>
      <label>{displayLabel}</label>
      <input
        type="number"
        placeholder="Enter number"
        value={displayValue}
        onChange={handleChange}
        style={{ color: '#007bff' }}
        readOnly={!!datasetKey} // Make read-only if bound to dataset
      />
    </div>
  );
};

export default NumberFieldComponent;
