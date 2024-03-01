import "@nomiclabs/hardhat-ethers"
import color from "cli-color"
var msg = color.xterm(39).bgXterm(128)
import hre, { ethers, network } from "hardhat"

const initialMint = ethers.parseEther("10000")

export default async ({ getNamedAccounts, deployments }: any) => {
    const { deploy } = deployments

    const { deployer } = await getNamedAccounts()

    const uri =
        "https://bafybeifkpdwa4tkbbze5qui3yn2ph5cntiiojmdlkoxah5fs4mc55b3vt4.ipfs.w3s.link/arthera-whitepaper-nft-metadata.json"

    console.log("deployer:", deployer)

    const awp = await deploy("ArtheraWhitepaper", {
        from: deployer,
        args: [uri, deployer],
        log: true
    })

    switch (hre.network.name) {
        case "arthera":
            console.log(
                "Arthera Whitepaper NFT contract deployed:",
                msg(awp.receipt.contractAddress)
            )
            break

        case "arthera-testnet":
            console.log(
                "Arthera Whitepaper NFT contract deployed:",
                msg(awp.receipt.contractAddress)
            )
            break

        case "sepolia":
            try {
                console.log(
                    "Arthera Whitepaper NFT contract deployed:",
                    msg(awp.receipt.contractAddress)
                )
                console.log("\nEtherscan verification in progress...")
                console.log(
                    "\nWaiting for 6 block confirmations (you can skip this part)"
                )
                await hre.run("verify:verify", {
                    network: network.name,
                    address: awp.receipt.contractAddress,
                    constructorArguments: [initialMint]
                })
                console.log("Etherscan verification done. ✅")
            } catch (error) {
                console.error(error)
            }
            break
    }
}
export const tags = ["ArtheraWhitepaper"]
