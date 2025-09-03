import React, { useState, useEffect } from 'react';
import type { Dataset } from '../types';
import { parseDataset } from '../utils/datasetUtils';

interface Props {
  dataset: Dataset | null;
  onDatasetChange: (dataset: Dataset | null) => void;
}

const DatasetInput: React.FC<Props> = ({ dataset, onDatasetChange }) => {
  // initialize with current dataset
  const [jsonInput, setJsonInput] = useState(() => {
    if (dataset) {
      return JSON.stringify(dataset, null, 2);
    }
    return '';
  });
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

  // Update jsonInput when dataset prop changes from external sources
  useEffect(() => {
    console.log('Dataset changed:', dataset);
    if (dataset && !isUserTyping) {
      const expectedJson = JSON.stringify(dataset, null, 2);
      console.log('Setting JSON input to:', expectedJson);
      setJsonInput(expectedJson);
      setIsValid(true);
      setError(null);
    }
  }, [dataset, isUserTyping]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  // handle JSON input changes and validation
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log('User typed:', value);
    setIsUserTyping(true);
    setJsonInput(value);

    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set new timeout to reset isUserTyping after 1 second
    const newTimeout = setTimeout(() => {
      setIsUserTyping(false);
    }, 1000);
    setTypingTimeout(newTimeout);

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

  // clear dataset input
  const handleClear = () => {
    setJsonInput('');
    setError(null);
    setIsValid(false);
    onDatasetChange(null);
  };

  // load sample dataset
  const loadSample = () => {
    const sample = {
      price: 100,
      quantity: 3,
      discount: 0.1,
    };

    console.log('Loading sample data:', sample);
    setIsUserTyping(false); // Allow useEffect to update the textarea
    // Update the dataset first, which will trigger the useEffect
    onDatasetChange(sample);
  };

  return (
    <div className="dataset-input">
      <div className="dataset-header">
        <h3>Dataset</h3>
        <div className="dataset-actions">
          <button
            className="dataset-button sample"
            onClick={loadSample}
            title="Load sample"
          >
            Sample
          </button>
          <button
            className="dataset-button clear"
            onClick={handleClear}
            title="Clear"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="dataset-content">
        <label htmlFor="dataset-json">JSON Data:</label>
        <textarea
          id="dataset-json"
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder='{"price": 100, "quantity": 3, "discount": 0.1}'
          className={`dataset-textarea ${error ? 'error' : ''} ${isValid ? 'valid' : ''}`}
          rows={8}
          style={{ resize: 'vertical', color: '#007bff' }}
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
            Loaded {Object.keys(dataset).length} keys:{' '}
            {Object.keys(dataset).join(', ')}
          </div>
        )}

        <div className="dataset-help">
          <h4>Usage:</h4>
          <ul>
            <li>Enter valid JSON</li>
            <li>
              Use <code>{'{key}'}</code> in text to show values
            </li>
            <li>Example: "Price: {'{price}'}" shows "Price: 100"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DatasetInput;
