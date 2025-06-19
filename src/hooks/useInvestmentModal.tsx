
import { useState } from 'react';

export const useInvestmentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);

  const openModal = (unit: any) => {
    setSelectedUnit(unit);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUnit(null);
  };

  return {
    isOpen,
    selectedUnit,
    openModal,
    closeModal
  };
};
