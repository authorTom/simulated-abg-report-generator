export interface PatientDetails {
  fullName: string;
  dob: string; // Store as YYYY-MM-DD for input type="date"
  hospitalId: string;
}

export interface AbgValues {
  pH: number;
  PaCO2: number; // Partial pressure of CO2 in arterial blood (kPa)
  PaO2: number; // Partial pressure of O2 in arterial blood (kPa)
  HCO3: number; // Bicarbonate (mmol/L)
  BE: number;   // Base Excess (mmol/L)
  Lactate: number; // Lactate (mmol/L)
}

export interface ReferenceRange {
  low: number;
  high: number;
  unit: string;
  label: string; // Display label (e.g., 'PaCO₂')
}

// Extends ReferenceRange with slider/input control properties
export interface AbgParameter extends ReferenceRange {
  min: number;  // Min value for slider/input
  max: number;  // Max value for slider/input
  step: number; // Step value for slider/input
}


export interface PathologyPreset {
  description: string;
  values: AbgValues;
}
