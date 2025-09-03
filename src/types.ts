import React from 'react';

// available component types
export type ComponentType = 'Text' | 'Button' | 'NumberField' | 'FormulaField';

// component properties
export interface ComponentAttributes {
  label?: string;
  datasetKey?: string;
  formulaExpression?: string;
  style?: React.CSSProperties;
}

// page component structure
export interface PageComponent {
  id: string;
  type: ComponentType;
  attributes: ComponentAttributes;
  author: string;
  createdAt: string;
}

// page configuration (array of components)
export type PageConfig = PageComponent[];

// dataset for dynamic values
export interface Dataset {
  [key: string]: string | number | boolean;
}
