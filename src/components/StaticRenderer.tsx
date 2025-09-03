import React from 'react';
import type { PageComponent, Dataset } from '../types';
import ComponentRenderer from './ComponentRenderer';

interface Props {
  components: PageComponent[];
  dataset?: Dataset | null;
  title?: string;
}

const StaticRenderer: React.FC<Props> = ({
  components,
  dataset,
  title = 'Page',
}) => {
  // show empty state if no components
  if (components.length === 0) {
    return (
      <div className="static-renderer">
        {title && (
          <div className="static-renderer-header">
            <h2>{title}</h2>
          </div>
        )}
        <div className="static-renderer-content">
          <div className="empty-state">
            <p>No components</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="static-renderer">
      {title && (
        <div className="static-renderer-header">
          <h2>{title}</h2>
        </div>
      )}
      <div className="static-renderer-content">
        {components.map(component => (
          <div key={component.id} className="static-component-wrapper">
            <ComponentRenderer component={component} dataset={dataset} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticRenderer;
