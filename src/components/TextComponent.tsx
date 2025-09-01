import React from 'react';
import type { PageComponent, Dataset } from '../types';
import { replaceDatasetKeys } from '../utils/datasetUtils';

interface TextComponentProps {
  component: PageComponent;
  dataset?: Dataset | null;
}

const TextComponent: React.FC<TextComponentProps> = ({
  component,
  dataset,
}) => {
  const displayText = replaceDatasetKeys(
    component.attributes.label || 'Type something here',
    dataset || {}
  );

  return (
    <div className="text-component" style={component.attributes.style}>
      {displayText}
    </div>
  );
};

export default TextComponent;
