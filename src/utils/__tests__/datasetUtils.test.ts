import { replaceDatasetKeys } from '../datasetUtils';

describe('datasetUtils', () => {
  describe('replaceDatasetKeys', () => {
    const sampleDataset = {
      price: 100,
      quantity: 3,
      discount: 0.1,
      productName: 'Laptop',
      status: 'In Stock',
      rating: 4.8,
      reviews: 324,
    };

    test('should replace single key in text', () => {
      const result = replaceDatasetKeys('Price: {price}', sampleDataset);
      expect(result).toBe('Price: 100');
    });

    test('should replace multiple keys in text', () => {
      const result = replaceDatasetKeys(
        'Product: {productName}, Price: {price}',
        sampleDataset
      );
      expect(result).toBe('Product: Laptop, Price: 100');
    });

    test('should handle text without keys', () => {
      const result = replaceDatasetKeys(
        'Static text without keys',
        sampleDataset
      );
      expect(result).toBe('Static text without keys');
    });

    test('should handle empty text', () => {
      const result = replaceDatasetKeys('', sampleDataset);
      expect(result).toBe('');
    });

    test('should handle text with only keys', () => {
      const result = replaceDatasetKeys('{price}{quantity}', sampleDataset);
      expect(result).toBe('1003');
    });

    test('should handle keys with spaces', () => {
      const result = replaceDatasetKeys('Status: {status}', sampleDataset);
      expect(result).toBe('Status: In Stock');
    });

    test('should handle numeric values', () => {
      const result = replaceDatasetKeys(
        'Rating: {rating} stars',
        sampleDataset
      );
      expect(result).toBe('Rating: 4.8 stars');
    });

    test('should handle decimal values', () => {
      const result = replaceDatasetKeys('Discount: {discount}%', sampleDataset);
      expect(result).toBe('Discount: 0.1%');
    });

    test('should handle missing keys', () => {
      const result = replaceDatasetKeys(
        'Price: {price}, Missing: {missing}',
        sampleDataset
      );
      expect(result).toBe('Price: 100, Missing: {missing}');
    });

    test('should handle empty dataset', () => {
      const result = replaceDatasetKeys('Price: {price}', {});
      expect(result).toBe('Price: {price}');
    });

    test('should handle null dataset', () => {
      const result = replaceDatasetKeys(
        'Price: {price}',
        null as unknown as Dataset
      );
      expect(result).toBe('Price: {price}');
    });

    test('should handle undefined dataset', () => {
      const result = replaceDatasetKeys(
        'Price: {price}',
        undefined as unknown as Dataset
      );
      expect(result).toBe('Price: {price}');
    });

    test('should handle complex text with mixed content', () => {
      const result = replaceDatasetKeys(
        'Product: {productName} - Price: ${price} (Rating: {rating}/5)',
        sampleDataset
      );
      expect(result).toBe('Product: Laptop - Price: $100 (Rating: 4.8/5)');
    });

    test('should handle repeated keys', () => {
      const result = replaceDatasetKeys(
        '{price} + {price} = {price * 2}',
        sampleDataset
      );
      expect(result).toBe('100 + 100 = {price * 2}'); // Complex expressions not handled by this function
    });

    test('should handle keys with special characters', () => {
      const datasetWithSpecial = {
        'key-with-dash': 'value',
        key_with_underscore: 'value2',
      };
      const result = replaceDatasetKeys(
        '{key-with-dash} and {key_with_underscore}',
        datasetWithSpecial
      );
      expect(result).toBe('value and value2');
    });

    test('should handle boolean values', () => {
      const datasetWithBoolean = {
        ...sampleDataset,
        isActive: true,
        isDeleted: false,
      };
      const result = replaceDatasetKeys(
        'Active: {isActive}, Deleted: {isDeleted}',
        datasetWithBoolean
      );
      expect(result).toBe('Active: true, Deleted: false');
    });

    test('should handle zero values', () => {
      const datasetWithZero = { ...sampleDataset, zero: 0 };
      const result = replaceDatasetKeys('Zero: {zero}', datasetWithZero);
      expect(result).toBe('Zero: 0');
    });

    test('should handle negative values', () => {
      const datasetWithNegative = { ...sampleDataset, negative: -10 };
      const result = replaceDatasetKeys(
        'Negative: {negative}',
        datasetWithNegative
      );
      expect(result).toBe('Negative: -10');
    });

    test('should handle very long text', () => {
      const longText = 'Product: {productName} '.repeat(100) + 'Price: {price}';
      const result = replaceDatasetKeys(longText, sampleDataset);
      expect(result).toContain('Product: Laptop');
      expect(result).toContain('Price: 100');
      expect(result.split('Product: Laptop').length).toBe(101); // 100 repetitions + 1
    });

    test('should handle malformed key syntax', () => {
      const result = replaceDatasetKeys('Price: {price', sampleDataset);
      expect(result).toBe('Price: {price'); // Should not replace malformed keys
    });

    test('should handle nested braces', () => {
      const result = replaceDatasetKeys('Price: {{price}}', sampleDataset);
      expect(result).toBe('Price: {{price}}'); // Should not replace nested braces
    });

    test('should handle empty keys', () => {
      const result = replaceDatasetKeys('Price: {}', sampleDataset);
      expect(result).toBe('Price: {}'); // Should not replace empty keys
    });

    test('should handle whitespace in keys', () => {
      const datasetWithSpaces = { ' price ': 100 };
      const result = replaceDatasetKeys('Price: { price }', datasetWithSpaces);
      expect(result).toBe('Price: 100'); // Should handle spaces in keys
    });
  });
});
