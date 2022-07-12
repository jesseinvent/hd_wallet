const generateBTCAddressFromPublicKey = require("./addresses/generateBTCAddressFromPublicKey");
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc);

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

module.exports = (seed) => {
  // Get node root (bip32)
  const root = bip32.fromSeed(Buffer.from(seed, "hex")); // (master key)

  // Derive address node
  const path = `m/44'/0'/0'/0/0`; // m / purpose' / coin_type' / account' / change / address_index
  const account = root.derivePath(path);

  const publicKey = account.publicKey.toString("hex");
  const privateKey = account.privateKey.toString("hex");
  const address = generateBTCAddressFromPublicKey(publicKey);

  console.log(`Public Key: ${publicKey}`);
  console.log(`Address: ${address}`);
  console.log(`Private Key: ${privateKey}`);

  return {
    address,
    privateKey,
  };
};
