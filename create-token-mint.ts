import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("SECRET_KEY is required");
  process.exit(1);
}
const asArr = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArr);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const tokenMint = await createMint(
  connection,
  sender,
  sender.publicKey,
  null,
  2,
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✨ Token Mint: ${link}`);
