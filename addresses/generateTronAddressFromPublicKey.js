const keccakHash = require("keccak");
const bs58Check = require("bs58check");

module.exports = (publicKey) => {
  const sha3Hash = keccakHash("keccak256").update(publicKey).digest("hex");
  const hex = `41${sha3Hash.slice(-40)}`;
  const address = bs58Check.encode(Buffer.from(hex, "hex"));

  return address;
};
