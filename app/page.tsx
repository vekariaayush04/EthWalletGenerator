"use client";
import { useState } from "react";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import MnemonicModal from "../components/MnemonicModal";
import WalletList from "../components/WalletList";
import Button from "../components/Button";
import { GridBackgroundDemo } from "@/components/GridBackground";
import ShowMnemonic from "@/components/ShowMnemonic";

interface Wallet {
  privateKey: string;
  publicKey: string;
}

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const generateMnemonic = () => {
    const newMnemonic: string = bip39.generateMnemonic();
    setMnemonic(newMnemonic);
    setIsModalOpen(true); 
  };
  const showMnemonic = () => {
    setIsModalOpen(true); 
  };

  const addWallet = () => {
    if (!mnemonic) return;

    const seed: Uint8Array = bip39.mnemonicToSeedSync(mnemonic);
    const hdNode = ethers.HDNodeWallet.fromSeed(seed);

    const index = wallets.length;
    const wallet = hdNode.derivePath(`m/44'/60'/0'/0/${index}`);

    const newWallet: Wallet = {
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
    };

    setWallets([...wallets, newWallet]);
  };

  

  return (
    <>
      <div className="relative h-screen overflow-none bg-black overflow-y-auto">
      <GridBackgroundDemo />
        
        <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
          <div className=" rounded-lg p-8 max-w-xl w-full max-h-[90vh]  shadow-lg z-20">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">
              Ethereum Wallet Generator
            </h1>

            {!mnemonic && (
              <div className="flex justify-center items-center mb-4">
              <Button
                onClick={generateMnemonic}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Generate Mnemonic
              </Button>
            </div>
            )}

            {mnemonic && (
              <div className="flex justify-center items-center mb-4">
              <Button
                onClick={showMnemonic}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Show Mnemonic
              </Button>
              
            </div>
            )}
            

            {mnemonic && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={addWallet}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Add Wallet
                </Button>
              </div>
            )}

            
            {wallets.length > 0 && <WalletList wallets={wallets} />}
          </div>
        </div>

        {isModalOpen && mnemonic && (
          <MnemonicModal
            mnemonic={mnemonic}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}
