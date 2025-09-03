import React, { useState } from 'react';
import type { PageComponent } from '../types';

interface ConfigManagerProps {
  components: PageComponent[];
  onLoadConfig: (components: PageComponent[]) => void;
}

const ConfigManager: React.FC<ConfigManagerProps> = ({
  components,
  onLoadConfig,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSaveToLocalStorage = () => {
    try {
      localStorage.setItem('pageBuilderConfig', JSON.stringify(components));
      alert('Configuration saved to localStorage!');
    } catch (error) {
      alert('Failed to save configuration: ' + (error as Error).message);
    }
  };

  const handleLoadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('pageBuilderConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        onLoadConfig(parsed);
        alert('Configuration loaded from localStorage!');
      } else {
        alert('No saved configuration found in localStorage');
      }
    } catch (error) {
      alert('Failed to load configuration: ' + (error as Error).message);
    }
  };

  const handleExportJSON = () => {
    try {
      const config = {
        components,
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
      };

      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `page-config-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert('Configuration exported successfully!');
    } catch (error) {
      alert('Failed to export configuration: ' + (error as Error).message);
    }
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        if (parsed.components && Array.isArray(parsed.components)) {
          onLoadConfig(parsed.components);
          alert('Configuration imported successfully!');
        } else {
          alert('Invalid configuration file format');
        }
      } catch (error) {
        alert('Failed to import configuration: ' + (error as Error).message);
      }
    };

    reader.readAsText(file);
    // Reset the input
    event.target.value = '';
  };

  const handleClearConfig = () => {
    if (
      confirm(
        'Are you sure you want to clear all components? This cannot be undone.'
      )
    ) {
      onLoadConfig([]);
    }
  };

  return (
    <div className="config-manager">
      <div className="config-header">
        <h3>Page Configuration</h3>
        <button
          className="config-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="config-content">
          <div className="config-actions">
            <button
              className="config-button save"
              onClick={handleSaveToLocalStorage}
              title="Save to browser storage"
            >
              💾 Save
            </button>
            <button
              className="config-button load"
              onClick={handleLoadFromLocalStorage}
              title="Load from browser storage"
            >
              📂 Load
            </button>
            <button
              className="config-button export"
              onClick={handleExportJSON}
              title="Export as JSON file"
            >
              📤 Export
            </button>
            <label className="config-button import" title="Import JSON file">
              📥 Import
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                style={{ display: 'none' }}
              />
            </label>
            <button
              className="config-button clear"
              onClick={handleClearConfig}
              title="Clear all components"
            >
              🗑️ Clear
            </button>
          </div>

          <div className="config-info">
            <p>
              <strong>Components:</strong> {components.length}
            </p>
            <p>
              <strong>Types:</strong>{' '}
              {Array.from(new Set(components.map(c => c.type))).join(', ') ||
                'None'}
            </p>
          </div>

          <div className="config-help">
            <h4>Quick Actions:</h4>
            <ul>
              <li>
                <strong>Save:</strong> Store config in browser
              </li>
              <li>
                <strong>Load:</strong> Restore from browser
              </li>
              <li>
                <strong>Export:</strong> Download as JSON file
              </li>
              <li>
                <strong>Import:</strong> Upload JSON file
              </li>
              <li>
                <strong>Clear:</strong> Remove all components
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigManager;
