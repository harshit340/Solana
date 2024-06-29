import {Keypair , PublicKey} from "@solana/web3.js"


//this genratew the new key everytime it executed
const ownerKeypair = Keypair.generate()
const publickey = ownerKeypair.publicKey;
console.log(publickey.toBase58());

ownerKeypair.secretKey //  this give you a secret for that public key

// if you dont want to generate the keys again and again we can use our know key

/* const secret = JSON.parse(process.env.PRIVATE_KEY)as number[]
const secretKey = Uint8Array.from(secret)
const keypairFromSecretkey = Keypair.fromSecretKey(secretKey)
 */

