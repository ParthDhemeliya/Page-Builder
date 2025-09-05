import React from 'react';
import type { PageComponent, Dataset } from '../types';
import { replaceDatasetKeys } from '../utils/datasetUtils';
import { evaluateFormula } from '../utils/formulaUtils';

interface Props {
  component: PageComponent;
  dataset?: Dataset | null;
}

const ButtonComponent: React.FC<Props> = ({ component, dataset }) => {
  // Process text with both key replacement and formula evaluation
  const processText = (text: string): string => {
    // First, replace simple keys like name, age
    let processedText = replaceDatasetKeys(text, dataset || {});

    // Then, evaluate formulas like price * quantity}
    processedText = processedText.replace(
      /\{([^}]+)\}/g,
      (match, expression) => {
        // Check if it's a formula contains operators
        if (
          expression.includes('+') ||
          expression.includes('-') ||
          expression.includes('*') ||
          expression.includes('/')
        ) {
          const result = evaluateFormula(expression, dataset || {});
          return result.success ? result.result?.toString() || match : match;
        }
        return match;
      }
    );

    return processedText;
  };

  // handle button click based on action type
  const handleClick = () => {
    const action = component.attributes.action || 'alert';

    switch (action) {
      case 'alert': {
        const message = component.attributes.alertMessage || 'Button clicked!';
        const processedMessage = processText(message);
        alert(processedMessage);
        break;
      }

      case 'console':
        console.log('Button clicked:', component.attributes.label);
        break;

      case 'navigate': {
        const url = component.attributes.navigateUrl || 'https://example.com';
        window.open(url, '_blank');
        break;
      }

      case 'submit': {
        // Find the closest form and submit it
        const form = document.querySelector('form');
        if (form) {
          form.submit();
        } else {
          console.log('No form found to submit');
        }
        break;
      }

      case 'custom': {
        try {
          const customCode =
            component.attributes.customAction || 'console.log("Custom action")';
          // Note: In a real app, you'd want to sandbox this execution
          eval(customCode);
        } catch (error) {
          console.error('Error executing custom action:', error);
        }
        break;
      }

      default:
        console.log('Button clicked:', component.attributes.label);
    }
  };

  // Get button style class
  const buttonStyle = component.attributes.buttonStyle || 'primary';
  const buttonClass = `button-component button-${buttonStyle}`;

  const buttonLabel = component.attributes.label || 'Button';
  const displayLabel = processText(buttonLabel);

  return (
    <button
      className={buttonClass}
      style={component.attributes.style}
      onClick={() => {
        // Single click to select component
      }}
      onDoubleClick={e => {
        e.stopPropagation();
        handleClick();
      }}
      title="Single click to select, double click to trigger action"
    >
      {displayLabel}
    </button>
  );
};

export default ButtonComponent;
