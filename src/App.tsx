import React from 'react';
import './App.css';
import { PageComponent } from './types';
import ComponentRenderer from './components/ComponentRenderer';

// Dummy config as described in Day 1 update
const pageConfig: PageComponent[] = [
  { id: '1', type: 'Text', attributes: { label: 'Hello World' } },
  { id: '2', type: 'Button', attributes: { label: 'Click Me' } },
];

function App() {
  return (
    <div className="app">
      <h1>Page Builder</h1>
      <div className="page-content">
        {pageConfig.map(component => (
          <div key={component.id} className="component-wrapper">
            <ComponentRenderer component={component} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
