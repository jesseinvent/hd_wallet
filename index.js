const bip39 = require("bip39");
const hdKey = require("hdkey");
const generateBitcoinAddress = require("./generateBitcoinWalletFromSeed");
const generateEthWalletFromSeed = require("./generateEthWalletFromSeed");
const generateTronWalletFromSeed = require("./generateTronWalletFromSeed");

// STEP 1: Generate mnemonic phrase and convert to seed phrase (bip39)
const mnemonic = bip39.generateMnemonic();

console.log(`mnemonic: ${mnemonic}`);

// STEP 2: Convert mnemonic phrase to seed (bip39)
const seed = bip39.mnemonicToSeedSync(mnemonic);

console.log(`Seed Phrase: ${seed.toString("hex")}`);

// STEP 3: Address generation (bip32)
// Generate root of node tree
const root = hdKey.fromMasterSeed(seed);

// Get masterPrivateKey from root
const masterPrivateKey = root.privateKey.toString("hex");
const masterPublicKey = root.publicKey.toString("hex");

console.log(`Master Public Key: ${masterPublicKey}`);
console.log(`Master Private key: ${masterPrivateKey}`);

console.log(" ");

console.log("Bitcoin");
generateBitcoinAddress(seed.toString("hex"));

console.log(" ");

console.log("Ethereum");
generateEthWalletFromSeed(seed.toString("hex"));

console.log(" ");

console.log("Tron");
generateTronWalletFromSeed(seed.toString("hex"));
