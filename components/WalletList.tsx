import React from 'react';

interface Wallet {
  privateKey: string;
  publicKey: string;
}

interface WalletListProps {
  wallets: Wallet[];
}

const WalletList: React.FC<WalletListProps> = ({ wallets }) => {
  return (
    <div className="mt-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Wallets</h2>
      <ul className="space-y-4">
        {wallets.map((wallet, index) => (
          <li key={index} className="p-4 bg-gray-700 shadow-md rounded-lg border border-gray-600">
            <div className="font-semibold text-white">
              Wallet {index + 1}:
            </div>
            <div className="text-gray-400 mt-2 break-all">
              <div><strong>Private Key:</strong> {wallet.privateKey}</div>
              <div><strong>Public Key:</strong> {wallet.publicKey}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletList;
