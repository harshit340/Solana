import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));  // It returns the URL of the RPC (Remote Procedure Call) endpoint for the specified cluster. In this case, "devnet" refers to the development network of Solana.

const address = new PublicKey('harTe2QhcHjGiU9MduC8hqbxDrf6YDqdyGSKttAxiwf'); //asigining the new public key to an address
const balance = await connection.getBalance(address); // fetching the balance or lamports that address have
const balanceInSol = balance / LAMPORTS_PER_SOL;  // amount of balance in SOL

console.log(`The balance of the account at ${address} is ${balanceInSol} Sol`); 
console.log(`✅ Finished!`)



/* if you want to call thfdasdfsdae getBalance method on the solana network you could send the HTTP call to a solana cluster */

getBalanceJSONRPC(address.toBase58()).then(balance=>{
    console.log(balance / LAMPORTS_PER_SOL + "SOL")
})

// check if account is executable or not 
connection.getAccountInfo(address).then((accountInfo) => {
    console.log(accountInfo?.executable ?? false);  "if your here ? executable if your are note here ?? false"
    console.log(accountInfo!.lamports );
  });

// this whole code is the alternative of connection.getBalance
async function getBalanceJSONRPC(address:string): Promise<number>{
    const url = clusterApiUrl('devnet')
    console.log(url);

    return fetch(url,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            "jsonrpc":'2.0',
            "id":1,
            "method":"getBalance",
            "params":[
                address
            ]
        })
    }).then(response=>response.json())
    .then(json =>{
        if(json.error){
            throw json.error
        }

        return json['result']['value'] as number;
    })
    .catch(error =>{
        throw error
    })
}

//notes

/* Localhost is completely local to your machine and is useful for isolated testing and development.
Devnet is a public test network that mimics the mainnet environment and allows for more realistic testing with other developers and projects. */

/* Devnet is designed for developer use and testing, and DevNet tokens don't have real value. */





/* ///? steps to generate new keypair and airdrop the SOL 

solana-keygen grind --starts-with har:1 
solana config set -k .\key.json


solana-test-validator
solana cluster-version
solana config set --url http://127.0.0.1:8899

// This command will create a new keypair file at the specified location.
solana-keygen new -o /home/harshit340/.harTe2QhcHjGiU9MduC8hqbxDrf6YDqdyGSKttAxiwf.json
//Configure Solana CLI to use the newly created keypair as the default signer.
solana config set --keypair /home/harshit340/.harTe2QhcHjGiU9MduC8hqbxDrf6YDqdyGSKttAxiwf.json
solana config get
solana airdrop 1 */

