import React from 'react';
import type { PageComponent } from '../types';

interface Props {
  component: PageComponent;
}

const ButtonComponent: React.FC<Props> = ({ component }) => {
  // handle button click based on action type
  const handleClick = () => {
    const action = component.attributes.action || 'alert';

    switch (action) {
      case 'alert': {
        const message = component.attributes.alertMessage || 'Button clicked!';
        alert(message);
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
      {component.attributes.label || 'Button'}
    </button>
  );
};

export default ButtonComponent;
