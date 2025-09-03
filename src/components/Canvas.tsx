import React from 'react';
import type { PageComponent, Dataset } from '../types';
import ComponentRenderer from './ComponentRenderer';

interface Props {
  components: PageComponent[];
  onRemoveComponent: (id: string) => void;
  onSelectComponent: (component: PageComponent) => void;
  selectedComponent: PageComponent | null;
  dataset?: Dataset | null;
}

const Canvas: React.FC<Props> = ({
  components,
  onRemoveComponent,
  onSelectComponent,
  selectedComponent,
  dataset,
}) => {
  // show empty state if no components
  if (components.length === 0) {
    return (
      <div className="canvas">
        <h3>Your page</h3>
        <div className="canvas-empty">
          <p>No components yet. Add some from the left.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="canvas">
      <h3>Your page</h3>
      <div className="canvas-content">
        {components.map(component => (
          <div
            key={component.id}
            className={`canvas-component-wrapper ${selectedComponent?.id === component.id ? 'selected' : ''}`}
            onClick={() => onSelectComponent(component)}
          >
            <div className="component-header">
              <span className="component-type">{component.type}</span>
              <button
                className="remove-button"
                onClick={e => {
                  e.stopPropagation();
                  onRemoveComponent(component.id);
                }}
                title="Remove"
              >
                ×
              </button>
            </div>
            <ComponentRenderer component={component} dataset={dataset} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
