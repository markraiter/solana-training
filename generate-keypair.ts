import { Keypair } from "@solana/web3.js";
const keypair = Keypair.generate();
console.log(`✅ Generated keypair!`);
console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
