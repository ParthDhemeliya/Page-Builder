import type { PageComponent } from '../types';

interface TextComponentProps {
  component: PageComponent;
}

const TextComponent: React.FC<TextComponentProps> = ({ component }) => {
  return (
    <div className="text-component" style={component.attributes.style}>
      {component.attributes.label || 'Text Component'}
    </div>
  );
};

export default TextComponent;
