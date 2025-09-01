import type { Dataset } from '../types';

export const evaluateFormula = (
  formula: string,
  dataset: Dataset
): { success: boolean; result?: number; error?: string } => {
  if (!formula.trim()) {
    return { success: false, error: 'Formula is empty' };
  }

  try {
    // Replace dataset keys with their values
    let processedFormula = formula;

    // Replace {key} patterns with actual values from dataset
    processedFormula = processedFormula.replace(
      /\{([^}]+)\}/g,
      (_match, key) => {
        const value = dataset[key];
        if (value === undefined) {
          throw new Error(`Dataset key '${key}' not found`);
        }
        return String(value);
      }
    );

    // Validate the formula contains only safe characters
    const safePattern = /^[0-9+\-*/().\s]+$/;
    if (!safePattern.test(processedFormula)) {
      throw new Error('Formula contains unsafe characters');
    }

    // Evaluate the formula safely
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

export const formatFormulaDisplay = (
  formula: string,
  dataset: Dataset
): string => {
  if (!formula.trim()) return '';

  try {
    return formula.replace(/\{([^}]+)\}/g, (match, key) => {
      const value = dataset[key];
      return value !== undefined ? String(value) : match;
    });
  } catch {
    return formula;
  }
};
