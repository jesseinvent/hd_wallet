const Hdkey = require("hdkey");
const createHash = require("create-hash");
const bs58Check = require("bs58check");
const Bitcoin = require("bitcoinjs-lib");

// generateAddressFromPublicKey = (publicKey) => {
//   // Perform SHA-256 Hash on public key
//   const sha256Hash = createHash("sha256").update(publicKey).digest();

//   // Perform  RIPEMD-160 on SHA-256 result
//   const rmd160Hash = createHash("ripemd160").update(sha256Hash).digest();

//   // Add version byte in front of RIPEMD-160 hash (0x00 for mainnet, 0x6f for testnet)
//   const versionBytes = Buffer.allocUnsafe(21);
//   versionBytes.writeUInt8("0x00", 0);
//   rmd160Hash.copy(versionBytes, 1);

//   const result = bs58Check.encode(versionBytes);
//   return result;
// };

const generateAddressFromPublicKey = (publicKey) => {
  const result = Bitcoin.payments.p2pkh({
    pubkey: Buffer.from(publicKey, "hex"),
  });
  return result.address;
};

module.exports = (seed) => {
  // Get node root (bip32)
  const root = Hdkey.fromMasterSeed(Buffer.from(seed, "hex"));

  // console.log(root);

  // Derive address node
  const path = "m/44'/0'/0'/0"; // m / purpose' / coin_type' / account' / change / address_index
  const btcAddressNode = root.derive(path);

  // console.log(btcAddressNode);

  const publicKey = btcAddressNode.publicKey.toString("hex");
  const privateKey = btcAddressNode.privateKey.toString("hex");

  const address = generateAddressFromPublicKey(publicKey);

  console.log(`Public Key: ${publicKey}`);
  console.log(`Address: ${address}`);
  console.log(`PrivateKey: ${privateKey}`);

  return {
    address,
    privateKey,
  };
};
