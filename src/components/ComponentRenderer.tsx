import { Suspense, lazy } from 'react';
import type { PageComponent, Dataset } from '../types';

// Lazy load individual component types for better performance
const TextComponent = lazy(() => import('./TextComponent'));
const ButtonComponent = lazy(() => import('./ButtonComponent'));
const NumberFieldComponent = lazy(() => import('./NumberFieldComponent'));
const FormulaFieldComponent = lazy(() => import('./FormulaFieldComponent'));

interface Props {
  component: PageComponent;
  dataset?: Dataset | null;
}

// Loading component for individual component types
const ComponentLoadingFallback = () => (
  <div className="component-loading">
    <div className="component-spinner"></div>
  </div>
);

const ComponentRenderer: React.FC<Props> = ({ component, dataset }) => {
  // render component based on type with lazy loading
  switch (component.type) {
    case 'Text':
      return (
        <Suspense fallback={<ComponentLoadingFallback />}>
          <TextComponent component={component} dataset={dataset} />
        </Suspense>
      );
    case 'Button':
      return (
        <Suspense fallback={<ComponentLoadingFallback />}>
          <ButtonComponent component={component} dataset={dataset} />
        </Suspense>
      );
    case 'NumberField':
      return (
        <Suspense fallback={<ComponentLoadingFallback />}>
          <NumberFieldComponent component={component} dataset={dataset} />
        </Suspense>
      );
    case 'FormulaField':
      return (
        <Suspense fallback={<ComponentLoadingFallback />}>
          <FormulaFieldComponent component={component} dataset={dataset} />
        </Suspense>
      );
    default:
      return <div>Unknown type: {component.type}</div>;
  }
};

export default ComponentRenderer;
