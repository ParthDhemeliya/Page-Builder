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

  // render styling controls
  const renderStylingControls = () => {
    const currentStyle = selectedComponent.attributes.style || {};

    const updateStyle = (styleKey: string, value: string) => {
      const updated = {
        ...selectedComponent,
        attributes: {
          ...selectedComponent.attributes,
          style: {
            ...currentStyle,
            [styleKey]: value,
          },
        },
      };
      onUpdateComponent(updated);
    };

    return (
      <div className="inspector-section">
        <h5>Styling</h5>

        {/* Font Size */}
        <div className="inspector-field">
          <label htmlFor="fontSize">Font Size:</label>
          <input
            id="fontSize"
            type="number"
            value={currentStyle.fontSize || ''}
            onChange={e =>
              updateStyle(
                'fontSize',
                e.target.value ? `${e.target.value}px` : ''
              )
            }
            placeholder="16"
            style={{ color: '#007bff' }}
          />
        </div>

        {/* Text Color */}
        <div className="inspector-field">
          <label htmlFor="color">Text Color:</label>
          <input
            id="color"
            type="color"
            value={currentStyle.color || '#000000'}
            onChange={e => updateStyle('color', e.target.value)}
            style={{ color: '#007bff' }}
          />
        </div>

        {/* Background Color */}
        <div className="inspector-field">
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            id="backgroundColor"
            type="color"
            value={currentStyle.backgroundColor || '#ffffff'}
            onChange={e => updateStyle('backgroundColor', e.target.value)}
            style={{ color: '#007bff' }}
          />
        </div>

        {/* Text Alignment */}
        <div className="inspector-field">
          <label htmlFor="textAlign">Text Alignment:</label>
          <select
            id="textAlign"
            value={currentStyle.textAlign || 'left'}
            onChange={e => updateStyle('textAlign', e.target.value)}
            style={{ color: '#007bff' }}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        {/* Font Weight */}
        <div className="inspector-field">
          <label htmlFor="fontWeight">Font Weight:</label>
          <select
            id="fontWeight"
            value={currentStyle.fontWeight || 'normal'}
            onChange={e => updateStyle('fontWeight', e.target.value)}
            style={{ color: '#007bff' }}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        {/* Button Style (for Button components) */}
        {selectedComponent.type === 'Button' && (
          <div className="inspector-field">
            <label htmlFor="buttonStyle">Button Style:</label>
            <select
              id="buttonStyle"
              value={currentStyle.buttonStyle || 'primary'}
              onChange={e => updateStyle('buttonStyle', e.target.value)}
              style={{ color: '#007bff' }}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        )}
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
        return (
          <>
            {renderField(
              'label',
              'Button Text',
              selectedComponent.attributes.label || ''
            )}
            <div className="inspector-field">
              <label htmlFor="action">Action:</label>
              <select
                id="action"
                value={selectedComponent.attributes.action || 'alert'}
                onChange={e => handleChange('action', e.target.value)}
                style={{ color: '#007bff' }}
              >
                <option value="alert">Show Alert</option>
                <option value="console">Log to Console</option>
                <option value="navigate">Navigate</option>
                <option value="submit">Submit Form</option>
                <option value="custom">Custom Action</option>
              </select>
            </div>
            {selectedComponent.attributes.action === 'alert' &&
              renderField(
                'alertMessage',
                'Alert Message',
                selectedComponent.attributes.alertMessage || 'Button clicked!'
              )}
            {selectedComponent.attributes.action === 'navigate' &&
              renderField(
                'navigateUrl',
                'Navigate URL',
                selectedComponent.attributes.navigateUrl ||
                  'https://example.com'
              )}
            {selectedComponent.attributes.action === 'custom' &&
              renderField(
                'customAction',
                'Custom Action Code',
                selectedComponent.attributes.customAction ||
                  'console.log("Custom action")'
              )}
          </>
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

        {renderStylingControls()}

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
