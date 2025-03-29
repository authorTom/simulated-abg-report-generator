import React from 'react';
import { Stethoscope } from 'lucide-react'; // Example icon
import type { AbgValues, PatientDetails, ReferenceRange } from '../lib/types';

interface AbgPrintoutProps {
  patientDetails: PatientDetails;
  abgValues: AbgValues;
  referenceRanges: Record<keyof AbgValues, ReferenceRange>; // Add reference ranges prop
}

const AbgPrintout: React.FC<AbgPrintoutProps> = ({ patientDetails, abgValues, referenceRanges }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB'); // UK format DD/MM/YYYY
    } catch {
      return 'Invalid Date';
    }
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const getInterpretation = (param: keyof AbgValues, value: number): string => {
    const range = referenceRanges[param];
    if (value < range.low) return 'Low';
    if (value > range.high) return 'High';
    return 'Normal';
  };

  const getInterpretationClass = (interpretation: string): string => {
    switch (interpretation) {
      case 'Low': return 'text-blue-600 font-semibold';
      case 'High': return 'text-red-600 font-semibold';
      default: return 'text-green-600';
    }
  };

  // Determine overall interpretation (simplified example)
  const getOverallInterpretation = (): string => {
    const { pH, PaCO2, HCO3 } = abgValues;
    const phRange = referenceRanges.pH;
    const paco2Range = referenceRanges.PaCO2;
    const hco3Range = referenceRanges.HCO3;

    if (pH < phRange.low) { // Acidosis
      if (PaCO2 > paco2Range.high) return 'Respiratory Acidosis';
      if (HCO3 < hco3Range.low) return 'Metabolic Acidosis';
      return 'Mixed Acidosis or other complex state';
    } else if (pH > phRange.high) { // Alkalosis
      if (PaCO2 < paco2Range.low) return 'Respiratory Alkalosis';
      if (HCO3 > hco3Range.high) return 'Metabolic Alkalosis';
      return 'Mixed Alkalosis or other complex state';
    } else {
      // Check for compensated states if pH is normal but others are off
      if (PaCO2 > paco2Range.high && HCO3 > hco3Range.high) return 'Compensated Respiratory Acidosis (likely)';
      if (PaCO2 < paco2Range.low && HCO3 < hco3Range.low) return 'Compensated Respiratory Alkalosis (likely)';
      if (PaCO2 < paco2Range.low && HCO3 > hco3Range.high) return 'Compensated Metabolic Alkalosis (likely)';
      if (PaCO2 > paco2Range.high && HCO3 < hco3Range.low) return 'Compensated Metabolic Acidosis (likely)';

      return 'Normal Acid-Base Balance';
    }
  };


  return (
    <div className="font-mono text-sm bg-white p-5 border border-gray-400 shadow-md text-gray-800">
      {/* Header */}
      <div className="text-center mb-4 border-b pb-2 border-gray-300">
        <Stethoscope className="inline-block h-6 w-6 mr-2 text-indigo-600" />
        <h2 className="text-lg font-bold inline-block align-middle">ARTERIAL BLOOD GAS REPORT</h2>
        <p className="text-xs text-gray-500">Simulated Hospital Trust</p>
      </div>

      {/* Patient Info */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-xs">
        <div><strong>Patient:</strong> {patientDetails.fullName}</div>
        <div><strong>Hospital ID:</strong> {patientDetails.hospitalId}</div>
        <div><strong>DOB:</strong> {formatDate(patientDetails.dob)}</div>
        <div><strong>Report Date:</strong> {new Date().toLocaleDateString('en-GB')} {formatTime()}</div>
      </div>

      {/* Results Table */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Parameter</th>
            <th className="border border-gray-300 px-2 py-1 text-right font-semibold">Result</th>
            <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Unit</th>
            <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Reference Range</th>
             <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Interpretation</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(abgValues).map(([key, value]) => {
             const paramKey = key as keyof AbgValues;
             const range = referenceRanges[paramKey];
             const interpretation = getInterpretation(paramKey, value);
             const precision = range.unit.toLowerCase() === 'ph' ? 2 : 1; // pH usually has 2 decimal places

            return (
              <tr key={key} className="even:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1">{range.label}</td>
                <td className={`border border-gray-300 px-2 py-1 text-right font-medium ${getInterpretationClass(interpretation)}`}>
                  {value.toFixed(precision)}
                </td>
                <td className="border border-gray-300 px-2 py-1">{range.unit}</td>
                <td className="border border-gray-300 px-2 py-1">{range.low.toFixed(precision)} - {range.high.toFixed(precision)}</td>
                 <td className={`border border-gray-300 px-2 py-1 ${getInterpretationClass(interpretation)}`}>
                  {interpretation}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

       {/* Overall Interpretation */}
      <div className="mt-4 pt-2 border-t border-gray-300">
        <h3 className="font-semibold mb-1">Interpretation Summary:</h3>
        <p className="text-sm font-medium text-indigo-700">{getOverallInterpretation()}</p>
      </div>


      {/* Footer */}
      <div className="text-center mt-5 pt-2 border-t border-dashed border-gray-400 text-xs text-gray-500">
        --- End of Report ---
        <p>Simulated results for educational purposes only.</p>
      </div>
    </div>
  );
};

export default AbgPrintout;
