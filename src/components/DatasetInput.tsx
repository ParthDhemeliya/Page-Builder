import React, { useState } from 'react';
import type { Dataset } from '../types';
import { parseDataset } from '../utils/datasetUtils';

interface DatasetInputProps {
  dataset: Dataset | null;
  onDatasetChange: (dataset: Dataset | null) => void;
}

const DatasetInput: React.FC<DatasetInputProps> = ({
  dataset,
  onDatasetChange,
}) => {
  const [jsonInput, setJsonInput] = useState(() => {
    if (dataset) {
      return JSON.stringify(dataset, null, 2);
    }
    return '';
  });
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJsonInput(value);

    if (!value.trim()) {
      setError(null);
      setIsValid(false);
      onDatasetChange(null);
      return;
    }

    const result = parseDataset(value);

    if (result.success) {
      setError(null);
      setIsValid(true);
      onDatasetChange(result.data!);
    } else {
      setError(result.error!);
      setIsValid(false);
      onDatasetChange(null);
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setError(null);
    setIsValid(false);
    onDatasetChange(null);
  };

  const handleLoadSample = () => {
    const sampleDataset = {
      price: 100,
      name: 'Product Name',
      description: 'Sample product description',
      stock: 50,
      category: 'Electronics',
    };

    const sampleJson = JSON.stringify(sampleDataset, null, 2);
    setJsonInput(sampleJson);
    setError(null);
    setIsValid(true);
    onDatasetChange(sampleDataset);
  };

  return (
    <div className="dataset-input">
      <div className="dataset-header">
        <h3>Dataset</h3>
        <div className="dataset-actions">
          <button
            className="dataset-button sample"
            onClick={handleLoadSample}
            title="Load sample dataset"
          >
            Sample
          </button>
          <button
            className="dataset-button clear"
            onClick={handleClear}
            title="Clear dataset"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="dataset-content">
        <label htmlFor="dataset-json">JSON Dataset:</label>
        <textarea
          id="dataset-json"
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder='{"price": 100, "name": "Product"}'
          className={`dataset-textarea ${error ? 'error' : ''} ${isValid ? 'valid' : ''}`}
          rows={8}
        />

        {error && (
          <div className="dataset-error">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        {isValid && dataset && (
          <div className="dataset-info">
            <span className="success-icon">✓</span>
            Dataset loaded with {Object.keys(dataset).length} keys:{' '}
            {Object.keys(dataset).join(', ')}
          </div>
        )}

        <div className="dataset-help">
          <h4>How to use:</h4>
          <ul>
            <li>Enter a valid JSON object</li>
            <li>
              Use <code>{'{key}'}</code> in text labels to display values
            </li>
            <li>Example: "Price: {'{price}'}" will show "Price: 100"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DatasetInput;
