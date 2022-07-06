const Hdkey = require("hdkey");
const bs58Check = require("bs58check");
const createHash = require("create-hash");
const keccakHash = require("keccak");

const generateTronAddressFromPublicKey = (publicKey) => {
  const sha3Hash = keccakHash("keccak256").update(publicKey).digest("hex");
  const hex = `41${sha3Hash.slice(-40)}`;
  const address = bs58Check.encode(Buffer.from(hex, "hex"));

  return address;
};

module.exports = (seed) => {
  // Get node root (bip32)
  const root = Hdkey.fromMasterSeed(Buffer.from(seed, "hex"));

  // Derive address node
  const path = "m/44'/195'/0'/0/0"; // m / purpose' / coin_type' / account' / change / address_index
  const tronAddressNode = root.derive(path);

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
