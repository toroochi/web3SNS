"use client";
import { Button } from "../parts/Button";
import { Lalezar } from "next/font/google";
import Web3 from "web3";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useSyncProviders } from "../../hook/useSyncProviders";

const lalezar = Lalezar({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const providers = useSyncProviders();

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = (await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      })) as string[];
    } catch (error) {
      console.error(error);
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
              className="flex justify-center font-bold text-4xl transform transition-transform duration-300 hover:scale-110"
              key={provider.info.uuid}
              onClick={() => handleConnect(provider)}>
              <img src={provider.info.icon} alt={provider.info.name} />
              <div className="text-center">{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>No Announced Wallet Providers</div>
        )}
      </div>
    </div>
  );
}
