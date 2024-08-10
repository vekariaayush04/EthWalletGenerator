import React from 'react';
import Button from './Button';

interface MnemonicModalProps {
  mnemonic: string;
  onClose: () => void;
}

const MnemonicModal: React.FC<MnemonicModalProps> = ({ mnemonic, onClose}) => {
  const formattedMnemonic = mnemonic.split(' ').map((word, index) => (
    <li key={index} className="text-gray-800">
      <span className="font-semibold"> </span>
      {word}
    </li>
  ));

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Mnemonic</h2>
        <ul className="list-decimal pl-6 mb-4 text-gray-700">
          {formattedMnemonic}
        </ul>
        <p className="text-gray-600 mb-4">
          <strong className="text-red-500">Disclaimer:</strong> Please save this mnemonic in a secure place.
        </p>
        <div className="flex justify-end space-x-4">
          
          <Button onClick={onClose} className="bg-red-500 text-white hover:bg-red-600">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MnemonicModal;
