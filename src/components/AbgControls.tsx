import React from 'react';
import type { AbgValues, AbgParameter } from '../lib/types';

interface AbgControlsProps {
  values: AbgValues;
  ranges: Record<keyof AbgValues, AbgParameter>;
  onChange: (param: keyof AbgValues, value: number) => void;
}

const AbgControls: React.FC<AbgControlsProps> = ({ values, ranges, onChange }) => {
  const handleSliderChange = (param: keyof AbgValues, value: string) => {
    onChange(param, parseFloat(value));
  };

  const handleInputChange = (param: keyof AbgValues, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      // Clamp value within reasonable limits if needed, or rely on slider range
      const { min, max } = ranges[param];
      onChange(param, Math.max(min, Math.min(max, numValue)));
    } else if (value === '') {
       // Allow clearing the input, maybe set to a default or min?
       // For now, let's just update state if it was a valid partial input or cleared
       // Or perhaps better: don't update if invalid, keep last valid number
    }
  };


  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Adjust ABG Values</h2>
      <div className="space-y-5">
        {Object.entries(ranges).map(([key, param]) => {
          const value = values[key as keyof AbgValues];
          return (
            <div key={key}>
              <label htmlFor={`${key}-slider`} className="block text-sm font-medium text-gray-700 mb-1">
                {param.label} ({param.unit})
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  id={`${key}-slider`}
                  name={key}
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={value}
                  onChange={(e) => handleSliderChange(key as keyof AbgValues, e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                />
                 <input
                  type="number"
                  id={`${key}-input`}
                  name={key}
                  value={value.toFixed(param.step.toString().includes('.') ? param.step.toString().split('.')[1].length : 0)} // Format to step precision
                  onChange={(e) => handleInputChange(key as keyof AbgValues, e.target.value)}
                  onBlur={(e) => handleInputChange(key as keyof AbgValues, e.target.value)} // Ensure update on blur
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-right"
                />
              </div>
               <div className="text-xs text-gray-500 mt-1 text-right">
                Range: {param.min} - {param.max}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AbgControls;
