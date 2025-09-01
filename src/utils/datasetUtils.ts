import type { Dataset } from '../types';

export const parseDataset = (
  jsonString: string
): { success: boolean; data?: Dataset; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);

    // Validate that it's an object
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return {
        success: false,
        error: 'Dataset must be a valid JSON object',
      };
    }

    return {
      success: true,
      data: parsed,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSON format',
    };
  }
};

export const replaceDatasetKeys = (text: string, dataset: Dataset): string => {
  if (!text || !dataset) return text;

  // Replace {key} patterns with dataset values
  return text.replace(/\{([^}]+)\}/g, (match, key) => {
    const value = dataset[key];
    return value !== undefined ? String(value) : match;
  });
};

export const validateDatasetKey = (key: string, dataset: Dataset): boolean => {
  return key in dataset;
};
