"use client";
import Image from "next/image";
import { Lalezar } from "next/font/google";
import Web3 from "web3";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useSyncProviders } from "./src/hook/useSyncProviders";
import { useRouter } from "next/navigation";
const lalezar = Lalezar({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [userAccount, setUserAccount] = useState<string>("");
  const providers = useSyncProviders();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");
  const setError = (error: string) => setErrorMessage(error);
  const isError = !!errorMessage;

  const formatAddress = (addr: string) => {
    const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
    return `${upperAfterLastTwo.substring(
      0,
      5
    )}...${upperAfterLastTwo.substring(39)}`;
  };

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = (await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);

      // Check if account exists, if not, create one
      const response = await fetch("/api/checkOrCreateAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account: accounts[0] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        // Redirect to the SNS page upon successful connection
        router.push("/sns");
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error(error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className={lalezar.className}>
        <p className="text-8xl text-center">ChainChat</p>
      </div>
      <div className="rounded bg-sns-gray w-1/2 mt-6 p-4 flex flex-col items-center">
        <p className="text-2xl font-bold">あなたの新しい分散型SNS</p>
        <p className="p-10">ChainChatとは</p>
        <p className="pb-10">
          ブロックチェーン技術を活用した次世代のSNSです。
          <br />
          私の目標は、ユーザーのプライバシーとセキュリティを最優先にし、
          <br />
          誰もが安心してコミュニケーションを楽しめる場所を提供することです。
        </p>
      </div>
      <div className={lalezar.className + " mt-6"}>
        {providers.length > 0 ? (
          providers?.map((provider: EIP6963ProviderDetail) => (
            <button
              key={provider.info.uuid}
              onClick={() => handleConnect(provider)}
              className="flex justify-center font-bold text-4xl transform transition-transform duration-300 hover:scale-110">
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>No Announced Wallet Providers</div>
        )}
      </div>
      <hr />
      <h2>{userAccount ? "" : "No"} Wallet Selected</h2>
      {userAccount && (
        <div className="selectedWallet">
          <img
            src={selectedWallet?.info.icon}
            alt={selectedWallet?.info.name}
          />
          <div>{selectedWallet?.info.name}</div>
          <div>({formatAddress(userAccount)})</div>
        </div>
      )}
      <div
        className="mmError"
        style={isError ? { backgroundColor: "brown" } : {}}>
        {isError && (
          <div onClick={clearError}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
