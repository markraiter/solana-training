import "dotenv/config";
import {
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    Connection,
    sendAndConfirmTransaction,
    TransactionInstruction,
} from "@solana/web3.js";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
    console.log("SECRET_KEY is required");
    process.exit(1);
}
const asArr = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArr);
const recipientPubKey = "EtvBVHgsoJMuwd6kSFuoMEdRY8EJ67G2J6q7DxVRT5pt";
const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const recipient = new PublicKey(recipientPubKey);
console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`)

const transaction = new Transaction();
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(sendSolInstruction);

const memoProgram = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

const memoText = "Hello from Solana!";

const addMemoInstruction = new TransactionInstruction({
  keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
  data: Buffer.from(memoText, "utf-8"),
  programId: memoProgram,
});

transaction.add(addMemoInstruction);

console.log(`📝 memo is: ${memoText}`);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`✅ Transaction confirmed, signature: ${signature}!`);
