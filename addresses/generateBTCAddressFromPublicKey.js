const Bitcoin = require("bitcoinjs-lib");

module.exports = (publicKey) => {
  const result = Bitcoin.payments.p2pkh({
    pubkey: Buffer.from(publicKey, "hex"),
    network: Bitcoin.networks.testnet,
  });

  // p2ms - Pay 2 Multisig
  const segwit = Bitcoin.payments.p2wpkh({
    pubkey: Buffer.from(publicKey, "hex"),
    network: Bitcoin.networks.testnet,
  }).address;

  return result.address;
};
