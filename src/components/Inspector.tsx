import React from 'react';
import type { PageComponent } from '../types';

interface Props {
  selectedComponent: PageComponent | null;
  onUpdateComponent: (updatedComponent: PageComponent) => void;
}

const Inspector: React.FC<Props> = ({
  selectedComponent,
  onUpdateComponent,
}) => {
  // show empty state if no component selected
  if (!selectedComponent) {
    return (
      <div className="inspector">
        <h3>Inspector</h3>
        <div className="inspector-empty">
          <p>Click a component to edit</p>
        </div>
      </div>
    );
  }

  // update component attribute
  const handleChange = (key: string, value: string | number) => {
    const updated = {
      ...selectedComponent,
      attributes: {
        ...selectedComponent.attributes,
        [key]: value,
      },
    };
    onUpdateComponent(updated);
  };

  // render input field for component properties
  const renderField = (
    key: string,
    label: string,
    value: string = '',
    type: string = 'text'
  ) => {
    return (
      <div key={key} className="inspector-field">
        <label htmlFor={key}>{label}:</label>
        <input
          id={key}
          type={type}
          value={value}
          onChange={e => handleChange(key, e.target.value)}
          placeholder={label}
          style={{ color: '#007bff' }}
        />
      </div>
    );
  };

  // render fields based on component type
  const renderFields = () => {
    switch (selectedComponent.type) {
      case 'Text':
        return renderField(
          'label',
          'Text',
          selectedComponent.attributes.label || ''
        );

      case 'Button':
        return renderField(
          'label',
          'Button Text',
          selectedComponent.attributes.label || ''
        );

      case 'NumberField':
        return (
          <>
            {renderField(
              'label',
              'Label',
              selectedComponent.attributes.label || ''
            )}
            {renderField(
              'datasetKey',
              'Data Key',
              selectedComponent.attributes.datasetKey || ''
            )}
          </>
        );

      case 'FormulaField':
        return (
          <>
            {renderField(
              'label',
              'Label',
              selectedComponent.attributes.label || ''
            )}
            {renderField(
              'formulaExpression',
              'Formula',
              selectedComponent.attributes.formulaExpression || ''
            )}
          </>
        );

      default:
        return <div>Unknown type</div>;
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
          {renderFields()}
        </div>

        <div className="inspector-section">
          <h5>Info</h5>
          <div className="inspector-field">
            <label>ID:</label>
            <span>{selectedComponent.id}</span>
          </div>
          <div className="inspector-field">
            <label>Type:</label>
            <span>{selectedComponent.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspector;
