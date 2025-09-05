import React from 'react';
import type { PageComponent, Dataset } from '../types';
import { replaceDatasetKeys } from '../utils/datasetUtils';

interface Props {
  component: PageComponent;
  dataset?: Dataset | null;
}

const TextComponent: React.FC<Props> = ({ component, dataset }) => {
  const text = component.attributes.label || 'Enter text here';

  const displayText = replaceDatasetKeys(text, dataset || {});

  return (
    <div className="text-component" style={component.attributes.style}>
      {displayText}
    </div>
  );
};

export default TextComponent;
