import type { Dataset } from '../types';

// evaluate mathematical formula with dataset values
export const evaluateFormula = (
  formula: string,
  dataset: Dataset
): { success: boolean; result?: number; error?: string } => {
  if (!formula.trim()) {
    return { success: false, error: 'Formula is empty' };
  }

  try {
    // replace dataset keys with their values
    let processedFormula = formula;

    // replace {key} patterns with actual values from dataset
    processedFormula = processedFormula.replace(
      /\{([^}]+)\}/g,
      (_match, key) => {
        // Handle complex expressions like "price * quantity"
        if (
          key.includes('*') ||
          key.includes('+') ||
          key.includes('-') ||
          key.includes('/')
        ) {
          // Split by operators and replace each key
          let expression = key;

          // Replace each dataset key in the expression
          for (const datasetKey of Object.keys(dataset)) {
            const regex = new RegExp(`\\b${datasetKey}\\b`, 'g');
            expression = expression.replace(regex, String(dataset[datasetKey]));
          }

          // Check if any keys remain unreplaced
          const remainingKeys = expression.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g);
          if (remainingKeys && remainingKeys.length > 0) {
            throw new Error(`Dataset key '${remainingKeys[0]}' not found`);
          }

          return `(${expression})`;
        } else {
          // Simple key replacement
          const value = dataset[key];
          if (value === undefined) {
            throw new Error(`Dataset key '${key}' not found`);
          }
          return String(value);
        }
      }
    );

    // validate the formula contains only safe characters
    const safePattern = /^[0-9+\-*/().\s]+$/;
    if (!safePattern.test(processedFormula)) {
      throw new Error('Formula contains unsafe characters');
    }

    // Check for invalid operator sequences
    if (/\+\s*\+|-\s*-|\*\s*\*|\/\s*\//.test(processedFormula)) {
      throw new Error('Formula contains invalid operator sequences');
    }

    // Check if formula contains only operators (no numbers)
    if (!/[0-9]/.test(processedFormula)) {
      throw new Error('Formula contains unsafe characters');
    }

    // evaluate the formula safely
    const result = Function(
      '"use strict"; return (' + processedFormula + ')'
    )();

    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Formula result is not a valid number');
    }

    return { success: true, result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid formula',
    };
  }
};

// format formula for display by replacing keys with values
export const formatFormulaDisplay = (
  formula: string,
  dataset: Dataset
): string => {
  if (!formula) return formula; // Return original string including whitespace

  try {
    return formula.replace(/\{([^}]+)\}/g, (match, key) => {
      // Handle complex expressions like "price * quantity"
      if (
        key.includes('*') ||
        key.includes('+') ||
        key.includes('-') ||
        key.includes('/')
      ) {
        let expression = key;

        // Replace each dataset key in the expression
        for (const datasetKey of Object.keys(dataset)) {
          const regex = new RegExp(`\\b${datasetKey}\\b`, 'g');
          expression = expression.replace(regex, String(dataset[datasetKey]));
        }

        return expression;
      } else {
        // Simple key replacement
        const value = dataset[key];
        return value !== undefined ? String(value) : match;
      }
    });
  } catch {
    return formula;
  }
};
