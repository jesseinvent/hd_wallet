const ethUtil = require("ethereumjs-util");

module.exports = generateAddressFromPublicKey = (publicKey) => {
  const result = ethUtil
    .publicToAddress(Buffer.from(publicKey, "hex"), true)
    .toString("hex");
  const address = ethUtil.toChecksumAddress(`0x${result}`);
  return address;
};
