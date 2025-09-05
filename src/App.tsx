import { useState } from 'react';
import './App.css';
import ComponentPalette from './components/ComponentPalette';
import Canvas from './components/Canvas';
import Inspector from './components/Inspector';
import DatasetInput from './components/DatasetInput';
import StaticRenderer from './components/StaticRenderer';
import type { PageComponent, ComponentType, Dataset } from './types';

function App() {
  const [components, setComponents] = useState<PageComponent[]>([]);
  const [selectedComponent, setSelectedComponent] =
    useState<PageComponent | null>(null);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // add new component to page
  const addComponent = (type: ComponentType) => {
    const newComponent: PageComponent = {
      id: Date.now().toString(),
      type,
      attributes: {
        label: `New ${type}`,
      },
      author: 'user',
      createdAt: new Date().toISOString(),
    };

    setComponents(prev => [...prev, newComponent]);
  };

  // remove component from page
  const removeComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  // select component for editing
  const selectComponent = (component: PageComponent) => {
    setSelectedComponent(component);
  };

  // reorder components
  const reorderComponents = (newComponents: PageComponent[]) => {
    setComponents(newComponents);
  };

  // update component properties
  const updateComponent = (updatedComponent: PageComponent) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
    );
    setSelectedComponent(updatedComponent);
  };

  // handle dataset updates
  const handleDatasetChange = (newDataset: Dataset | null) => {
    setDataset(newDataset);
  };

  return (
    <div
      className="app"
      style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}
    >
      <header className="app-header mb-6 pb-5 border-b">
        <div className="flex items-start justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-semibold text-slate-800 mb-1">
              Page Builder
            </h1>
            <p className="text-slate-500 text-sm">
              Build pages with dynamic data
            </p>
          </div>
          <div className="preview-toggle flex items-center gap-3">
            <span className="text-sm text-slate-600">Builder</span>
            <label className="preview-toggle-switch">
              <input
                type="checkbox"
                checked={isPreviewMode}
                onChange={e => setIsPreviewMode(e.target.checked)}
              />
              <span className="preview-toggle-slider"></span>
            </label>
            <span className="text-sm text-slate-600">Preview</span>
          </div>
        </div>
      </header>
      {isPreviewMode ? (
        <div className="preview-section">
          <StaticRenderer
            components={components}
            dataset={dataset}
            title="Generated Page"
          />
        </div>
      ) : (
        <div className="app-layout builder-mode grid gap-6">
          <aside className="sidebar bg-white rounded-lg p-5 shadow border">
            <ComponentPalette onAddComponent={addComponent} />
            <DatasetInput
              dataset={dataset}
              onDatasetChange={handleDatasetChange}
            />
          </aside>

          <main className="main-content bg-white rounded-lg p-5 shadow border">
            <Canvas
              components={components}
              onRemoveComponent={removeComponent}
              onSelectComponent={selectComponent}
              onReorderComponents={reorderComponents}
              selectedComponent={selectedComponent}
              dataset={dataset}
            />
          </main>

          <aside className="inspector-sidebar bg-white rounded-lg p-5 shadow border">
            <Inspector
              selectedComponent={selectedComponent}
              onUpdateComponent={updateComponent}
            />
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
