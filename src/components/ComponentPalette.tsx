import React from 'react';
import type { ComponentType } from '../types';

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType) => void;
}

const ComponentPalette: React.FC<ComponentPaletteProps> = ({
  onAddComponent,
}) => {
  const componentTypes: { type: ComponentType; label: string; icon: string }[] =
    [
      { type: 'Text', label: 'Add some text', icon: 'T' },
      { type: 'Button', label: 'Add a button', icon: 'B' },
      { type: 'NumberField', label: 'Add a number field', icon: 'N' },
      { type: 'FormulaField', label: 'Add a formula field', icon: 'F' },
    ];

  return (
    <div className="component-palette">
      <h3>What do you want to add?</h3>
      <div className="palette-buttons">
        {componentTypes.map(({ type, label, icon }) => (
          <button
            key={type}
            className="palette-button"
            onClick={() => onAddComponent(type)}
            title={label}
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
