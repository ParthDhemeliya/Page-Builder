import { evaluateFormula, formatFormulaDisplay } from '../formulaUtils';

describe('formulaUtils', () => {
  describe('evaluateFormula', () => {
    const sampleDataset = {
      price: 100,
      quantity: 3,
      discount: 0.1,
      productName: 'Laptop',
      status: 'In Stock',
      rating: 4.8,
      reviews: 324,
    };

    describe('Basic arithmetic operations', () => {
      test('should evaluate simple addition', () => {
        const result = evaluateFormula('{price} + {quantity}', sampleDataset);
        expect(result.success).toBe(true);
        expect(result.result).toBe(103);
      });

      test('should evaluate simple subtraction', () => {
        const result = evaluateFormula('{price} - {quantity}', sampleDataset);
        expect(result.success).toBe(true);
        expect(result.result).toBe(97);
      });

      test('should evaluate simple multiplication', () => {
        const result = evaluateFormula('{price} * {quantity}', sampleDataset);
        expect(result.success).toBe(true);
        expect(result.result).toBe(300);
      });

      test('should evaluate simple division', () => {
        const result = evaluateFormula('{price} / {quantity}', sampleDataset);
        expect(result.success).toBe(true);
        expect(result.result).toBeCloseTo(33.333, 2);
      });
    });

    describe('Complex expressions', () => {
      test('should evaluate complex multiplication with parentheses', () => {
        const result = evaluateFormula('{price * quantity}', sampleDataset);
        expect(result.success).toBe(true);
        expect(result.result).toBe(300);
      });

      test('should evaluate discount calculation', () => {
        const result = evaluateFormula(
          '{price * quantity * (1 - discount)}',
          sampleDataset
        );
        expect(result.success).toBe(true);
        expect(result.result).toBe(270); // 100 * 3 * (1 - 0.1) = 300 * 0.9 = 270
      });

      test('should evaluate nested operations', () => {
        const result = evaluateFormula(
          '{price * quantity + reviews}',
          sampleDataset
        );
        expect(result.success).toBe(true);
        expect(result.result).toBe(624); // 100 * 3 + 324 = 300 + 324 = 624
      });

      test('should evaluate division with multiplication', () => {
        const result = evaluateFormula(
          '{price * quantity / reviews}',
          sampleDataset
        );
        expect(result.success).toBe(true);
        expect(result.result).toBeCloseTo(0.926, 3); // 300 / 324 ≈ 0.926
      });
    });

    describe('Edge cases', () => {
      test('should handle empty formula', () => {
        const result = evaluateFormula('', sampleDataset);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Formula is empty');
      });

      test('should handle whitespace-only formula', () => {
        const result = evaluateFormula('   ', sampleDataset);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Formula is empty');
      });

      test('should handle missing dataset key', () => {
        const result = evaluateFormula('{nonexistent}', sampleDataset);
        expect(result.success).toBe(false);
        expect(result.error).toBe("Dataset key 'nonexistent' not found");
      });

      test('should handle invalid characters', () => {
        const result = evaluateFormula(
          '{price} + alert("hack")',
          sampleDataset
        );
        expect(result.success).toBe(false);
        expect(result.error).toBe('Formula contains unsafe characters');
      });

      test('should handle division by zero', () => {
        const result = evaluateFormula('{price} / 0', sampleDataset);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Formula result is not a valid number');
      });

      test('should handle invalid mathematical expression', () => {
        const result = evaluateFormula('{price} + + {quantity}', sampleDataset);
        expect(result.success).toBe(false);
        expect(result.error).toBe(
          'Formula contains invalid operator sequences'
        );
      });
    });

    describe('Dataset key variations', () => {
      test('should handle numeric values', () => {
        const result = evaluateFormula('{price} + 50', sampleDataset);
        expect(result.success).toBe(true);
        expect(result.result).toBe(150);
      });

      test('should handle decimal values', () => {
        const result = evaluateFormula('{rating} * 10', sampleDataset);
        expect(result.success).toBe(true);
        expect(result.result).toBe(48);
      });

      test('should handle zero values', () => {
        const datasetWithZero = { ...sampleDataset, zero: 0 };
        const result = evaluateFormula('{price} + {zero}', datasetWithZero);
        expect(result.success).toBe(true);
        expect(result.result).toBe(100);
      });

      test('should handle negative values', () => {
        const datasetWithNegative = { ...sampleDataset, negative: -10 };
        const result = evaluateFormula(
          '{price} + {negative}',
          datasetWithNegative
        );
        expect(result.success).toBe(true);
        expect(result.result).toBe(90);
      });
    });

    describe('Complex real-world scenarios', () => {
      test('should calculate total with tax', () => {
        const datasetWithTax = { ...sampleDataset, taxRate: 0.08 };
        const result = evaluateFormula(
          '{price * quantity * (1 + taxRate)}',
          datasetWithTax
        );
        expect(result.success).toBe(true);
        expect(result.result).toBe(324); // 300 * 1.08 = 324
      });

      test('should calculate average rating', () => {
        const result = evaluateFormula(
          '{rating * reviews / reviews}',
          sampleDataset
        );
        expect(result.success).toBe(true);
        expect(result.result).toBe(4.8);
      });

      test('should calculate percentage discount', () => {
        const result = evaluateFormula('{discount * 100}', sampleDataset);
        expect(result.success).toBe(true);
        expect(result.result).toBe(10);
      });

      test('should calculate final price after discount', () => {
        const result = evaluateFormula(
          '{price * (1 - discount)}',
          sampleDataset
        );
        expect(result.success).toBe(true);
        expect(result.result).toBe(90); // 100 * (1 - 0.1) = 90
      });
    });
  });

  describe('formatFormulaDisplay', () => {
    const sampleDataset = {
      price: 100,
      quantity: 3,
      discount: 0.1,
      productName: 'Laptop',
    };

    test('should format simple key replacement', () => {
      const result = formatFormulaDisplay('{price}', sampleDataset);
      expect(result).toBe('100');
    });

    test('should format complex expression', () => {
      const result = formatFormulaDisplay('{price * quantity}', sampleDataset);
      expect(result).toBe('100 * 3');
    });

    test('should format nested operations', () => {
      const result = formatFormulaDisplay(
        '{price * quantity * (1 - discount)}',
        sampleDataset
      );
      expect(result).toBe('100 * 3 * (1 - 0.1)');
    });

    test('should handle multiple keys in one expression', () => {
      const result = formatFormulaDisplay(
        '{price} + {quantity} + {discount}',
        sampleDataset
      );
      expect(result).toBe('100 + 3 + 0.1');
    });

    test('should handle mixed operations', () => {
      const result = formatFormulaDisplay(
        '{price * quantity + discount}',
        sampleDataset
      );
      expect(result).toBe('100 * 3 + 0.1');
    });

    test('should handle empty formula', () => {
      const result = formatFormulaDisplay('', sampleDataset);
      expect(result).toBe('');
    });

    test('should handle whitespace formula', () => {
      const result = formatFormulaDisplay('   ', sampleDataset);
      expect(result).toBe('   ');
    });

    test('should handle missing keys', () => {
      const result = formatFormulaDisplay(
        '{price} + {nonexistent}',
        sampleDataset
      );
      expect(result).toBe('100 + {nonexistent}');
    });

    test('should handle non-mathematical keys', () => {
      const result = formatFormulaDisplay('{productName}', sampleDataset);
      expect(result).toBe('Laptop');
    });

    test('should handle complex real-world formula', () => {
      const result = formatFormulaDisplay(
        'Total: ${price * quantity * (1 - discount)}',
        sampleDataset
      );
      expect(result).toBe('Total: $100 * 3 * (1 - 0.1)');
    });
  });

  describe('Error handling and edge cases', () => {
    test('should handle malformed formula syntax', () => {
      const result = evaluateFormula('{price + quantity', {
        price: 100,
        quantity: 3,
      });
      expect(result.success).toBe(false);
    });

    test('should handle formula with only operators', () => {
      const result = evaluateFormula('+ - * /', {});
      expect(result.success).toBe(false);
      expect(result.error).toBe('Formula contains unsafe characters');
    });

    test('should handle formula with only numbers', () => {
      const result = evaluateFormula('100 + 200', {});
      expect(result.success).toBe(true);
      expect(result.result).toBe(300);
    });

    test('should handle very large numbers', () => {
      const result = evaluateFormula('{price} * 1000000', { price: 100 });
      expect(result.success).toBe(true);
      expect(result.result).toBe(100000000);
    });

    test('should handle very small decimal numbers', () => {
      const result = evaluateFormula('{price} * 0.0001', { price: 100 });
      expect(result.success).toBe(true);
      expect(result.result).toBe(0.01);
    });
  });
});
