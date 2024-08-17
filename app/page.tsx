"use client";
import { useState } from "react";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import MnemonicModal from "../components/MnemonicModal";
import WalletList from "../components/WalletList";
import {Button} from "../components/ui/button"
import { GridBackgroundDemo } from "@/components/GridBackground";
import ShowMnemonic from "@/components/ShowMnemonic";
import axios from "axios";
import FindBalance from "@/components/FindBalance";

interface Wallet {
  privateKey: string;
  publicKey: string;
  balance : string
}

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBalModalOpen, setIsBalModalOpen] = useState<boolean>(false);

  // const [isLoading,setIsLoading] = useState<boolean>(true)
  // const [balance,setBalance] = useState(0)
  const generateMnemonic = () => {
    const newMnemonic: string = bip39.generateMnemonic();
    setMnemonic(newMnemonic);
    setIsModalOpen(true); 
  };
  const showMnemonic = () => {
    setIsModalOpen(true); 
  };

  const showFindBalance = () => {
    setIsBalModalOpen(true)
  }

  const getBalance = async (wallet: Wallet) => {
    try {
      const res = await axios.post("https://eth-mainnet.g.alchemy.com/v2/Y7AeQGnZtEsJkuHCBQQz_EXXVifMD5oF", {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [`${wallet.publicKey}`, "latest"]
      });
      return res.data.result;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return "Error fetching balance";
    }
  };

  const addWallet = async () => {
    if (!mnemonic) return;

    const seed: Uint8Array = bip39.mnemonicToSeedSync(mnemonic);
    const hdNode = ethers.HDNodeWallet.fromSeed(seed);

    const index = wallets.length;
    const wallet = hdNode.derivePath(`m/44'/60'/0'/0/${index}`);
    console.log(wallet);    
    console.log(new ethers.SigningKey(wallet.privateKey));
    const data = new ethers.Wallet(wallet.privateKey)
    console.log(data);
    
    const newWallet: Wallet = {
      privateKey: wallet.privateKey,
      publicKey: wallet.address,
      balance: ""
    };
    const balance =await getBalance(newWallet)

    newWallet.balance = balance
    setWallets([...wallets, newWallet]);
  };

  

  return (
    <>
      <div className="relative h-screen overflow-none bg-black overflow-y-auto">
      <div className="w-screen flex justify-end">
      <Button className="m-10 z-30" onClick={showFindBalance}>Find Balance</Button>
      </div>
        <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
        
          <div className=" rounded-lg p-8  w-full max-h-[90vh]  shadow-lg z-20">
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


        {isBalModalOpen && (
          <FindBalance onClose={() => setIsBalModalOpen(false)}></FindBalance>
        )}
      </div>
    </>
  );
}
