import React from 'react';
import type { ComponentType } from '../types';

interface Props {
  onAddComponent: (type: ComponentType) => void;
}

const ComponentPalette: React.FC<Props> = ({ onAddComponent }) => {
  // available component types
  const types = [
    { type: 'Text' as ComponentType, label: 'Text', icon: 'T' },
    { type: 'Button' as ComponentType, label: 'Button', icon: 'B' },
    { type: 'NumberField' as ComponentType, label: 'Number', icon: 'N' },
    { type: 'FormulaField' as ComponentType, label: 'Formula', icon: 'F' },
  ];

  return (
    <div className="component-palette">
      <h3>Components</h3>
      <div className="palette-buttons">
        {types.map(({ type, label, icon }) => (
          <button
            key={type}
            className="palette-button"
            onClick={() => onAddComponent(type)}
            title={`Add ${label}`}
          >
            <span className="palette-icon">{icon}</span>
            <span className="palette-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComponentPalette;
