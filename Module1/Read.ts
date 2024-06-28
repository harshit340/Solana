import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));  // It returns the URL of the RPC (Remote Procedure Call) endpoint for the specified cluster. In this case, "devnet" refers to the development network of Solana.

const address = new PublicKey('harTe2QhcHjGiU9MduC8hqbxDrf6YDqdyGSKttAxiwf'); //asigining the new public key to an address
const balance = await connection.getBalance(address); // fetching the balance or lamports that address have
const balanceInSol = balance / LAMPORTS_PER_SOL;  // amount of balance in SOL

console.log(`The balance of the account at ${address} is ${balanceInSol} Sol`); 
console.log(`✅ Finished!`)





//notes

/* Devnet is designed for developer use and testing, and DevNet tokens don't have real value. */





/* ///? steps to generate new keypair and airdrop the SOL 

solana-test-validator
solana cluster-version
solana config set --url http://127.0.0.1:8899

// This command will create a new keypair file at the specified location.
solana-keygen new -o /home/harshit340/.harTe2QhcHjGiU9MduC8hqbxDrf6YDqdyGSKttAxiwf.json
//Configure Solana CLI to use the newly created keypair as the default signer.
solana config set --keypair /home/harshit340/.harTe2QhcHjGiU9MduC8hqbxDrf6YDqdyGSKttAxiwf.json
solana config get
solana airdrop 1 */

