//The steps within a transaction on Solana are called instructions.

import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction, clusterApiUrl,  sendAndConfirmTransaction } from "@solana/web3.js"
const connection = new Connection("http://localhost:8899")

async function getRecentBlockhash(connection) {
    const { blockhash } = await connection.getRecentBlockhash();
    return blockhash;
}
// every tranction is a program
//array of accounts that will be read from and/or written to

const ownerKeypair = Keypair.generate()
const publickey = ownerKeypair.publicKey;
const recipient = new PublicKey("harEP3FoiNNLNaCydA1npz5pXgMWN3FoMPurC83Ri1V")
console.log(publickey.toBase58());

// to airdrop the SOL by program
const airdropSignature = await connection.requestAirdrop(ownerKeypair.publicKey,1*LAMPORTS_PER_SOL)

const transaction = new Transaction()

// this is a automatic instruction for sending the SOL

/* const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: publickey,
  toPubkey:  recipient,
  lamports: LAMPORTS_PER_SOL * 0.1
})

transaction.add(sendSolInstruction) */

// we are creating the Manual instruction

const lamports = BigInt(LAMPORTS_PER_SOL*0.1);
const instructionData:Buffer = Buffer.alloc(4+8);
instructionData.writeUInt32LE(2,0);
instructionData.writeBigUInt64LE(lamports,4);

const manualInstruction = new TransactionInstruction({
    keys:[
        {
            pubkey:ownerKeypair.publicKey,
            isSigner:true,
            isWritable:true
        },{
            pubkey:recipient,
            isSigner:false,
            isWritable:true
        },
    ],
    programId:SystemProgram.programId,
    data:instructionData
})

transaction.add(manualInstruction)

const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [ownerKeypair]
)

console.log(signature)

//tranction instruction constructer requires

//an array of keys of type AccountMeta
//the public key for the program begin called
//an optional Buffer containing data to pass to the program

