import React from 'react';

interface ShowMnemonicProps {
  mnemonic: string;
}

const ShowMnemonic: React.FC<ShowMnemonicProps> = ({ mnemonic }) => {
  const mnemonicWords = mnemonic.split(' ');

  return (
    <div className="mt-8 w-full max-w-lg">
      <div className="p-4 bg-gray-800 shadow-md rounded-lg border border-gray-600">
        <h2 className="text-2xl font-bold text-white mb-4">Mnemonic</h2>
        <div className="text-gray-400 space-y-1">
          {mnemonicWords.map((word, index) => (
            <div key={index} className="flex items-center">
              <span className="text-blue-300 mr-2">{index + 1}.</span>
              <span>{word}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowMnemonic;
