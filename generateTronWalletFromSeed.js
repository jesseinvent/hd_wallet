const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);

const generateTronAddressFromPublicKey = require("./addresses/generateTronAddressFromPublicKey");

module.exports = (seed) => {
  // Get node root (bip32)
  const root = bip32.fromSeed(Buffer.from(seed, "hex")); // (master key)

  // Derive address node
  const path = "m/44'/195'/0'/0/0"; // m / purpose' / coin_type' / account' / change / address_index
  const tronAddressNode = root.derivePath(path);

  const publicKey = tronAddressNode.publicKey.toString("hex");
  const privateKey = tronAddressNode.privateKey.toString("hex");

  const address = generateTronAddressFromPublicKey(publicKey);

  console.log(`Public Key: ${publicKey}`);
  console.log(`Address: ${address}`);
  console.log(`PrivateKey: ${privateKey}`);

  return {
    address,
    privateKey,
  };
};
