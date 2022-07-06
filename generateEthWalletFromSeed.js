const Hdkey = require("hdkey");
const ethUtil = require("ethereumjs-util");

const generateAddressFromPublicKey = (publicKey) => {
  const result = ethUtil
    .publicToAddress(Buffer.from(publicKey, "hex"), true)
    .toString("hex");
  const address = ethUtil.toChecksumAddress(`0x${result}`);
  return address;
};

// const generateAddressFromPrivateKey = (privateKey) => {
//   const pubKey = ethUtil.privateToPublic(Buffer.from(privateKey, "hex"));
//   const result = ethUtil.publicToAddress(pubKey).toString("hex");
//   const address = ethUtil.toChecksumAddress(`0x${result}`);

//   return address;
// };

module.exports = (seed) => {
  // Get node root (bip32)
  const root = Hdkey.fromMasterSeed(Buffer.from(seed, "hex"));

  // Derive address node
  const path = "m/44'/60'/0'/0/0"; // m / purpose' / coin_type' / account' / change / address_index
  const ethAddressNode = root.derive(path);

  const publicKey = ethAddressNode.publicKey.toString("hex");
  const privateKey = ethAddressNode.privateKey.toString("hex");

  const address = generateAddressFromPublicKey(publicKey);
  // const address = generateAddressFromPrivateKey(privateKey);

  console.log(`Public Key: ${publicKey}`);
  console.log(`Address: ${address}`);
  console.log(`PrivateKey: ${privateKey}`);

  return {
    address,
    privateKey,
  };
};
