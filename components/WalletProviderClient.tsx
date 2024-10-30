// components/WalletProviderClient.tsx
"use client";

import React, { ReactNode, useMemo } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, AlphaWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

export default function WalletProviderClient({ children }: { children: ReactNode }) {
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  // Initialize all the wallets you want to support
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new AlphaWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}