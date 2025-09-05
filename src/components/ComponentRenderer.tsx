import type { PageComponent, Dataset } from '../types';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import NumberFieldComponent from './NumberFieldComponent';
import FormulaFieldComponent from './FormulaFieldComponent';

interface Props {
  component: PageComponent;
  dataset?: Dataset | null;
}

const ComponentRenderer: React.FC<Props> = ({ component, dataset }) => {
  // render component based on type
  switch (component.type) {
    case 'Text':
      return <TextComponent component={component} dataset={dataset} />;
    case 'Button':
      return <ButtonComponent component={component} dataset={dataset} />;
    case 'NumberField':
      return <NumberFieldComponent component={component} dataset={dataset} />;
    case 'FormulaField':
      return <FormulaFieldComponent component={component} dataset={dataset} />;
    default:
      return <div>Unknown type: {component.type}</div>;
  }
};

export default ComponentRenderer;
