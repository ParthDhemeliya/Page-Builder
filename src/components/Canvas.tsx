import React from 'react';
import type { PageComponent, Dataset } from '../types';
import ComponentRenderer from './ComponentRenderer';

interface CanvasProps {
  components: PageComponent[];
  onRemoveComponent: (id: string) => void;
  onSelectComponent: (component: PageComponent) => void;
  selectedComponent: PageComponent | null;
  dataset?: Dataset | null;
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  onRemoveComponent,
  onSelectComponent,
  selectedComponent,
  dataset,
}) => {
  if (components.length === 0) {
    return (
      <div className="canvas-empty">
        <p>Nothing here yet. Add some stuff from the left!</p>
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
                title="Delete this"
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
