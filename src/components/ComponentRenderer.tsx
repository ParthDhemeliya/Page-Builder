import type { PageComponent, Dataset } from '../types';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import NumberFieldComponent from './NumberFieldComponent';
import FormulaFieldComponent from './FormulaFieldComponent';

interface ComponentRendererProps {
  component: PageComponent;
  dataset?: Dataset | null;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  dataset,
}) => {
  switch (component.type) {
    case 'Text':
      return <TextComponent component={component} dataset={dataset} />;
    case 'Button':
      return <ButtonComponent component={component} />;
    case 'NumberField':
      return <NumberFieldComponent component={component} />;
    case 'FormulaField':
      return <FormulaFieldComponent component={component} dataset={dataset} />;
    default:
      return <div>Unknown component type: {component.type}</div>;
  }
};

export default ComponentRenderer;
