import React, { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import PatientInfo from './PatientInfo';
import AbgControls from './AbgControls';
import AbgPrintout from './AbgPrintout';
import { ABG_PARAMETERS, PATHOLOGIES, UK_REFERENCE_RANGES } from '../lib/constants';
import type { AbgValues, PatientDetails } from '../lib/types';

const AbgSimulator: React.FC = () => {
  const initialPatientDetails: PatientDetails = {
    fullName: 'Jane Doe',
    dob: '1985-07-15',
    hospitalId: 'H12345678',
  };

  const initialAbgValues: AbgValues = {
    pH: 7.40,
    PaCO2: 5.3,
    PaO2: 12.0,
    HCO3: 24,
    BE: 0,
    Lactate: 1.0,
  };

  const [patientDetails, setPatientDetails] = useState<PatientDetails>(initialPatientDetails);
  const [abgValues, setAbgValues] = useState<AbgValues>(initialAbgValues);
  const [selectedPathology, setSelectedPathology] = useState<string>('Normal');

  const printoutRef = useRef<HTMLDivElement>(null);

  const handlePatientDetailChange = (field: keyof PatientDetails, value: string) => {
    setPatientDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleAbgValueChange = (param: keyof AbgValues, value: number) => {
    setAbgValues(prev => ({ ...prev, [param]: value }));
  };

  const handlePathologyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pathologyName = event.target.value;
    setSelectedPathology(pathologyName);
    if (pathologyName === 'Custom') {
      // Keep current values if switching to custom
    } else if (PATHOLOGIES[pathologyName]) {
      setAbgValues(PATHOLOGIES[pathologyName].values);
    } else {
      // Handle 'Normal' or other cases if needed
      setAbgValues(PATHOLOGIES['Normal'].values);
    }
  };

  // Update selectedPathology to 'Custom' if any value is manually changed
  const handleManualValueChange = (param: keyof AbgValues, value: number) => {
    handleAbgValueChange(param, value);
    setSelectedPathology('Custom');
  };


  const exportToJpg = useCallback(() => {
    if (printoutRef.current) {
      html2canvas(printoutRef.current, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, // If using external images/fonts
        backgroundColor: '#ffffff', // Ensure background is white
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `abg_results_${patientDetails.hospitalId || 'export'}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9); // Use JPEG format with quality 0.9
        link.click();
      }).catch(err => {
        console.error("Error exporting to JPG:", err);
        alert("Failed to export image. See console for details.");
      });
    }
  }, [patientDetails.hospitalId]);


  return (
    <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow-xl p-6 md:p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Arterial Blood Gas (ABG) Simulator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          <PatientInfo
            details={patientDetails}
            onChange={handlePatientDetailChange}
          />

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
             <label htmlFor="pathology-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Pathology Preset:
            </label>
            <select
              id="pathology-select"
              value={selectedPathology}
              onChange={handlePathologyChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
            >
              {Object.keys(PATHOLOGIES).map(name => (
                <option key={name} value={name}>
                  {name} {name !== 'Custom' && name !== 'Normal' ? `(${PATHOLOGIES[name].description})` : ''}
                </option>
              ))}
               <option value="Custom">Custom Values</option>
            </select>
          </div>


          <AbgControls
            values={abgValues}
            ranges={ABG_PARAMETERS}
            onChange={handleManualValueChange} // Use wrapper for manual changes
          />
        </div>

        {/* Right Column: Printout Preview */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Results Preview</h2>
            <button
              onClick={exportToJpg}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Export as JPG
            </button>
          </div>
          <div ref={printoutRef} className="bg-white border border-gray-300 rounded-md p-4 shadow-inner">
             {/* Pass reference ranges to the printout */}
            <AbgPrintout
              patientDetails={patientDetails}
              abgValues={abgValues}
              referenceRanges={UK_REFERENCE_RANGES}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbgSimulator;
