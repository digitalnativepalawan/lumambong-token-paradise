
import React from 'react';
import { Label } from '@/components/ui/label';

interface NationalitySelectorProps {
  nationality: string;
  onNationalityChange: (nationality: string) => void;
}

const NationalitySelector = ({ nationality, onNationalityChange }: NationalitySelectorProps) => {
  return (
    <div>
      <Label htmlFor="nationality">Nationality *</Label>
      <select
        id="nationality"
        value={nationality}
        onChange={(e) => onNationalityChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      >
        <option value="">Select Nationality</option>
        <option value="ph">🇵🇭 Filipino</option>
        <option value="foreign">🌍 Foreign National</option>
      </select>
    </div>
  );
};

export default NationalitySelector;
