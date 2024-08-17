import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
interface FindModalProps {
  onClose: () => void;
}

const FindBalance: React.FC<FindModalProps> = ({ onClose }) => {
    const [address,setAddress] = useState("")
    const [balance,setBalance] = useState("")
    const getBalance = async (address : string) => {
        try {
          const res = await axios.post("https://eth-mainnet.g.alchemy.com/v2/Y7AeQGnZtEsJkuHCBQQz_EXXVifMD5oF", {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [`${address}`, "latest"]
          });
          return res.data.result;
        } catch (error) {
          console.error("Error fetching balance:", error);
          return "Error fetching balance";
        }
      };
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg h-60">

       <div className="flex">
       <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black text-lg">Check ETH Balance :</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </div>
          <input
            type="text"
            placeholder="0x0..."
            className="input input-bordered w-full max-w-xs text-white"
            onChange={(e)=>{
                setAddress(e.target.value)
            }}
          />
          {/* <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </div> */}
        </label>
        </div>

        <div>
        <Button
          onClick={onClose}
          className="bg-red-500 text-white hover:bg-red-600 ml-44 "
        >
          Close
        </Button>
        
        

        </div>
        

       </div>
       <button className="mt-12 btn btn-info text-white" onClick={async()=>{
        const bal = await getBalance(address)
        setBalance(bal)
       }}>Lookup</button>

       {balance !== "" && (
        <div>{parseInt(balance,16)/10**18} ETH</div>
       )}
      </div>
    </div>
  );
};

export default FindBalance;
