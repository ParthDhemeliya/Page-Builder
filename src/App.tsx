import './App.css';
import { useState } from 'react';
import type { PageComponent, ComponentType, Dataset } from './types';
import ComponentPalette from './components/ComponentPalette';
import Canvas from './components/Canvas';
import Inspector from './components/Inspector';
import DatasetInput from './components/DatasetInput';

// Starting with some basic components
const initialPageConfig: PageComponent[] = [
  {
    id: '1',
    type: 'Text',
    attributes: { label: 'Welcome to my page!' },
    author: 'me',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'Button',
    attributes: { label: 'Click here' },
    author: 'me',
    createdAt: new Date().toISOString(),
  },
];

function App() {
  const [components, setComponents] =
    useState<PageComponent[]>(initialPageConfig);
  const [selectedComponent, setSelectedComponent] =
    useState<PageComponent | null>(null);
  const [dataset, setDataset] = useState<Dataset | null>(null);

  const addComponent = (type: ComponentType) => {
    const newComponent: PageComponent = {
      id: Date.now().toString(),
      type,
      attributes: {
        label: `New ${type}`,
      },
      author: 'me',
      createdAt: new Date().toISOString(),
    };

    console.log('Added:', newComponent);
    setComponents(prev => [...prev, newComponent]);
  };

  const removeComponent = (id: string) => {
    console.log('Removed:', id);
    setComponents(prev => prev.filter(comp => comp.id !== id));
    // Clear selection if the removed component was selected
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  const selectComponent = (component: PageComponent) => {
    setSelectedComponent(component);
  };

  const updateComponent = (updatedComponent: PageComponent) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
    );
    setSelectedComponent(updatedComponent);
  };

  const handleDatasetChange = (newDataset: Dataset | null) => {
    setDataset(newDataset);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Page Builder</h1>
        <p className="app-subtitle">Build your own page</p>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <ComponentPalette onAddComponent={addComponent} />
          <DatasetInput
            dataset={dataset}
            onDatasetChange={handleDatasetChange}
          />
        </aside>

        <main className="main-content">
          <Canvas
            components={components}
            onRemoveComponent={removeComponent}
            onSelectComponent={selectComponent}
            selectedComponent={selectedComponent}
            dataset={dataset}
          />
        </main>

        <aside className="inspector-sidebar">
          <Inspector
            selectedComponent={selectedComponent}
            onUpdateComponent={updateComponent}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
