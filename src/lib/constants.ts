import type { AbgValues, AbgParameter, PathologyPreset, ReferenceRange } from './types';

// UK Reference Ranges
export const UK_REFERENCE_RANGES: Record<keyof AbgValues, ReferenceRange> = {
  pH: { low: 7.35, high: 7.45, unit: 'pH', label: 'pH' },
  PaCO2: { low: 4.7, high: 6.0, unit: 'kPa', label: 'PaCO₂' },
  PaO2: { low: 10.0, high: 13.3, unit: 'kPa', label: 'PaO₂' },
  HCO3: { low: 22, high: 26, unit: 'mmol/L', label: 'HCO₃⁻' },
  BE: { low: -2, high: 2, unit: 'mmol/L', label: 'Base Excess' },
  Lactate: { low: 0.5, high: 2.2, unit: 'mmol/L', label: 'Lactate' },
};

// Define parameter details including slider ranges and steps
export const ABG_PARAMETERS: Record<keyof AbgValues, AbgParameter> = {
  pH: { ...UK_REFERENCE_RANGES.pH, min: 7.00, max: 7.80, step: 0.01 },
  PaCO2: { ...UK_REFERENCE_RANGES.PaCO2, min: 1.0, max: 15.0, step: 0.1 },
  PaO2: { ...UK_REFERENCE_RANGES.PaO2, min: 3.0, max: 25.0, step: 0.1 },
  HCO3: { ...UK_REFERENCE_RANGES.HCO3, min: 5, max: 50, step: 1 },
  BE: { ...UK_REFERENCE_RANGES.BE, min: -15, max: 15, step: 1 },
  Lactate: { ...UK_REFERENCE_RANGES.Lactate, min: 0.1, max: 15.0, step: 0.1 },
};


// Common Pathologies with typical ABG values (adjust as needed for realism)
export const PATHOLOGIES: Record<string, PathologyPreset> = {
  'Normal': {
    description: 'Normal physiological state',
    values: { pH: 7.40, PaCO2: 5.3, PaO2: 12.0, HCO3: 24, BE: 0, Lactate: 1.0 },
  },
  'Metabolic Acidosis (Uncompensated)': {
    description: 'e.g., DKA, Lactic Acidosis',
    values: { pH: 7.25, PaCO2: 5.0, PaO2: 11.5, HCO3: 15, BE: -10, Lactate: 4.5 },
  },
  'Metabolic Acidosis (Compensated)': {
    description: 'Compensation via hyperventilation',
    values: { pH: 7.36, PaCO2: 3.5, PaO2: 12.5, HCO3: 16, BE: -8, Lactate: 3.0 },
  },
  'Respiratory Acidosis (Acute)': {
    description: 'e.g., Opioid overdose, Asthma attack',
    values: { pH: 7.20, PaCO2: 8.5, PaO2: 8.0, HCO3: 25, BE: -1, Lactate: 1.2 },
  },
  'Respiratory Acidosis (Chronic/Compensated)': {
    description: 'e.g., COPD',
    values: { pH: 7.35, PaCO2: 7.5, PaO2: 9.0, HCO3: 32, BE: 5, Lactate: 1.0 },
  },
  'Metabolic Alkalosis (Uncompensated)': {
    description: 'e.g., Vomiting, Diuretics',
    values: { pH: 7.55, PaCO2: 5.8, PaO2: 12.0, HCO3: 35, BE: 10, Lactate: 0.8 },
  },
   'Metabolic Alkalosis (Compensated)': {
    description: 'Compensation via hypoventilation',
    values: { pH: 7.46, PaCO2: 6.5, PaO2: 11.0, HCO3: 36, BE: 11, Lactate: 0.9 },
  },
  'Respiratory Alkalosis (Acute)': {
    description: 'e.g., Hyperventilation (Anxiety)',
    values: { pH: 7.58, PaCO2: 3.0, PaO2: 13.0, HCO3: 23, BE: 1, Lactate: 1.1 },
  },
   'Respiratory Alkalosis (Chronic/Compensated)': {
    description: 'e.g., High altitude, Pregnancy',
    values: { pH: 7.46, PaCO2: 3.5, PaO2: 12.5, HCO3: 19, BE: -3, Lactate: 1.0 },
  },
  'Type 1 Respiratory Failure': {
    description: 'Hypoxemia with normal/low PaCO2',
    values: { pH: 7.42, PaCO2: 4.5, PaO2: 7.0, HCO3: 24, BE: 0, Lactate: 1.5 },
  },
  'Type 2 Respiratory Failure': {
    description: 'Hypoxemia with Hypercapnia',
    values: { pH: 7.28, PaCO2: 8.0, PaO2: 6.5, HCO3: 28, BE: 2, Lactate: 1.8 },
  },
};
