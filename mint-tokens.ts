import { getExplorerLink } from "@solana-developers/helpers";
import { mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import "dotenv/config";


let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("SECRET_KEY required");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
const tokenMintAccount = new PublicKey("GX6QhyQEMn8yFcm1kaMotrdMkNsVxs4J1K968ZSjYNRA");
const recipientAssociatedTokenAccount = new PublicKey("5qEuMKDM2gKucojW8vAwArMyzCciNoUxT6SMPkyzpLjv");

const transactionSignature = await mintTo(
  connection,
  sender,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  sender,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);

