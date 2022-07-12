const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);

const generateETHAddressFromPublicKey = require("./addresses/generateETHAddressFromPublicKey");

module.exports = (seed) => {
  // Get node root (bip32)
  const root = bip32.fromSeed(Buffer.from(seed, "hex")); // (master key)

  // Derive address node
  const path = "m/44'/60'/0'/0/0"; // m / purpose' / coin_type' / account' / change / address_index
  const ethAddressNode = root.derivePath(path);

  const publicKey = ethAddressNode.publicKey.toString("hex");
  const privateKey = ethAddressNode.privateKey.toString("hex");

  const address = generateETHAddressFromPublicKey(publicKey);

  console.log(`Public Key: ${publicKey}`);
  console.log(`Address: ${address}`);
  console.log(`PrivateKey: ${privateKey}`);

  return {
    address,
    privateKey,
  };
};
