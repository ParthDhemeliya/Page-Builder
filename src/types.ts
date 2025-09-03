import React from 'react';

// available component types
export type ComponentType = 'Text' | 'Button' | 'NumberField' | 'FormulaField';

// component properties
export interface ComponentAttributes {
  label?: string;
  datasetKey?: string;
  formulaExpression?: string;
  style?: React.CSSProperties;
  // Button-specific properties
  action?: string;
  alertMessage?: string;
  navigateUrl?: string;
  customAction?: string;
  buttonStyle?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
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
