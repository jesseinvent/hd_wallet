const Bitcoin = require("bitcoinjs-lib");

module.exports = (publicKey) => {
  const result = Bitcoin.payments.p2pkh({
    pubkey: Buffer.from(publicKey, "hex"),
    network: Bitcoin.networks.testnet,
  });

  return result.address;
};
