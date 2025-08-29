import type { PageComponent } from '../types';

interface NumberFieldComponentProps {
  component: PageComponent;
}

const NumberFieldComponent: React.FC<NumberFieldComponentProps> = ({
  component,
}) => {
  return (
    <div className="number-field-component" style={component.attributes.style}>
      <label>{component.attributes.label || 'Number Field'}</label>
      <input
        type="number"
        placeholder="Enter a number"
        onChange={e =>
          console.log(`Number field ${component.id} value:`, e.target.value)
        }
      />
    </div>
  );
};

export default NumberFieldComponent;
