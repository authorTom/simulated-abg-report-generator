import React from 'react';
import type { PatientDetails } from '../lib/types';

interface PatientInfoProps {
  details: PatientDetails;
  onChange: (field: keyof PatientDetails, value: string) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ details, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof PatientDetails, value);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Patient Details</h2>
      <div className="space-y-3">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={details.fullName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={details.dob}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700">
            Hospital ID
          </label>
          <input
            type="text"
            id="hospitalId"
            name="hospitalId"
            value={details.hospitalId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
