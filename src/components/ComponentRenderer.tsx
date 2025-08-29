import type { PageComponent } from '../types';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import NumberFieldComponent from './NumberFieldComponent';
import FormulaFieldComponent from './FormulaFieldComponent';

interface ComponentRendererProps {
  component: PageComponent;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  switch (component.type) {
    case 'Text':
      return <TextComponent component={component} />;
    case 'Button':
      return <ButtonComponent component={component} />;
    case 'NumberField':
      return <NumberFieldComponent component={component} />;
    case 'FormulaField':
      return <FormulaFieldComponent component={component} />;
    default:
      return <div>Unknown component type: {component.type}</div>;
  }
};

export default ComponentRenderer;
