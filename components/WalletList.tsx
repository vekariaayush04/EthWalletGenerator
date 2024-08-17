"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface Wallet {
  privateKey: string;
  publicKey: string;
  balance : string
}

interface WalletListProps {
  wallets: Wallet[];
}



const WalletList: React.FC<WalletListProps> = ({ wallets }) => {
  const { toast } = useToast()
  const [balance,setBalance] = useState(0)

  const handleCopy = (e: React.MouseEvent<HTMLDivElement>) => {
    navigator.clipboard.writeText(e.currentTarget.textContent || "")
    console.log(e.currentTarget.textContent || "");
    
    toast({
      title: "Copied to clipBoard",
      variant : "default"
    })
  }
  
  return (
    <div className="mt-8 ">
      <h2 className="text-2xl font-bold text-white mb-4">Wallets</h2>
      <ul className="space-y-4">
        {wallets.map((wallet, index) => (
          <li
            key={index}
            className="p-4 bg-gray-700 shadow-md rounded-lg border border-gray-600"
          >
            <div className="font-semibold text-white">Wallet {index + 1}:</div>
            <div className="text-gray-400 mt-2 break-all">
              <div>
                <strong>Public Key:</strong>
                <br />
                 <div style={{cursor:'pointer'}}  onClick={handleCopy}>
                 {wallet.publicKey} 
                 </div>
              </div>
              <div>
                <strong >Private Key:</strong>{" "}
                <HideRevealData data={wallet.privateKey} onClick={handleCopy}/>
              </div>
              <div>
              <strong >Balance:</strong> <div>{parseInt(wallet.balance,16)}</div>
              </div>
             
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletList;

const HideRevealData = ({ data , onClick}: { data: any , onClick : any}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    
  };

  
  return (
    <div className="flex items-center justify-between">
      <span style={{ cursor: "pointer" }} onClick={onClick}>
        {isVisible ? data : "*".repeat(data.length)}
      </span>
      <button onClick={toggleVisibility} className="mr-10">
        {isVisible ? (
          <EyeOffIcon  />
        ) : (
          <EyeIcon  />
        )}
      </button>
      
    </div>
    
  );
};

const EyeIcon = () => {
  return(
    <div className="mr-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
    </div>
  )

}

const EyeOffIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>

  )

}

