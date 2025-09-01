import React from 'react';
import type { PageComponent } from '../types';

interface InspectorProps {
  selectedComponent: PageComponent | null;
  onUpdateComponent: (updatedComponent: PageComponent) => void;
}

const Inspector: React.FC<InspectorProps> = ({
  selectedComponent,
  onUpdateComponent,
}) => {
  if (!selectedComponent) {
    return (
      <div className="inspector">
        <h3>Inspector</h3>
        <div className="inspector-empty">
          <p>Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const handleAttributeChange = (key: string, value: string) => {
    const updatedComponent: PageComponent = {
      ...selectedComponent,
      attributes: {
        ...selectedComponent.attributes,
        [key]: value,
      },
    };
    onUpdateComponent(updatedComponent);
  };

  const renderAttributeField = (
    key: string,
    label: string,
    value: string = ''
  ) => {
    return (
      <div key={key} className="inspector-field">
        <label htmlFor={key}>{label}:</label>
        <input
          id={key}
          type="text"
          value={value}
          onChange={e => handleAttributeChange(key, e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    );
  };

  const renderComponentSpecificFields = () => {
    switch (selectedComponent.type) {
      case 'Text':
        return renderAttributeField(
          'label',
          'Label',
          selectedComponent.attributes.label || ''
        );

      case 'Button':
        return renderAttributeField(
          'label',
          'Button Text',
          selectedComponent.attributes.label || ''
        );

      case 'NumberField':
        return (
          <>
            {renderAttributeField(
              'label',
              'Label',
              selectedComponent.attributes.label || ''
            )}
            {renderAttributeField(
              'datasetKey',
              'Dataset Key',
              selectedComponent.attributes.datasetKey || ''
            )}
          </>
        );

      case 'FormulaField':
        return (
          <>
            {renderAttributeField(
              'label',
              'Label',
              selectedComponent.attributes.label || ''
            )}
            {renderAttributeField(
              'formulaExpression',
              'Formula Expression',
              selectedComponent.attributes.formulaExpression || ''
            )}
          </>
        );

      default:
        return <div>Unknown component type</div>;
    }
  };

  return (
    <div className="inspector">
      <h3>Inspector</h3>
      <div className="inspector-content">
        <div className="component-info">
          <h4>{selectedComponent.type} Component</h4>
          <p className="component-id">ID: {selectedComponent.id}</p>
        </div>

        <div className="inspector-section">
          <h5>Properties</h5>
          {renderComponentSpecificFields()}
        </div>

        <div className="inspector-section">
          <h5>Metadata</h5>
          <div className="inspector-field">
            <label>Author:</label>
            <span>{selectedComponent.author}</span>
          </div>
          <div className="inspector-field">
            <label>Created:</label>
            <span>
              {new Date(selectedComponent.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspector;
