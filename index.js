const bip39 = require("bip39");
const hdKey = require("hdkey");
const generateBitcoinWallet = require("./generateBitcoinWalletFromSeed");
const generateEthWalletFromSeed = require("./generateEthWalletFromSeed");
const generateTronWalletFromSeed = require("./generateTronWalletFromSeed");

// STEP 1: Generate mnemonic phrase and convert to seed phrase (bip39)
const mnemonic = bip39.generateMnemonic();

console.log(`mnemonic: ${mnemonic}`);

// STEP 2: Convert mnemonic phrase to seed (bip39)
const seedPhrase = bip39.mnemonicToSeedSync(mnemonic);
const seed = seedPhrase.toString("hex");

console.log(`seed: ${seed}`);

console.log("Bitcoin");
generateBitcoinWallet(seed.toString("hex"));

console.log(" ");

console.log("Ethereum");
generateEthWalletFromSeed(seed.toString("hex"));

console.log(" ");

console.log("Tron");
generateTronWalletFromSeed(seed.toString("hex"));
