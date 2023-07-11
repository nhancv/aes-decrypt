const decrypt = (encrypted, key) => {
  const crypto = require('crypto');
  const keyHash = crypto.createHash('md5').update(key).digest('hex');
  const textParts = encrypted.split(':');
  const ivPart = textParts.shift();
  if (ivPart) {
    const iv = Buffer.from(ivPart, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(keyHash.substr(0, 32).padStart(32, '*')), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
  return null;
};


const data = process.argv[2];
const key = process.argv[3];
console.log(decrypt(data, key))
