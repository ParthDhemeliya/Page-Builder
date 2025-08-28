export type ComponentType = 'Text' | 'Button' | 'NumberField' | 'FormulaField';

export interface ComponentAttributes {
  label?: string;
  datasetKey?: string;
  formulaExpression?: string;
  style?: React.CSSProperties;
}

export interface PageComponent {
  id: string;
  type: ComponentType;
  attributes: ComponentAttributes;
}

export type PageConfig = PageComponent[];
