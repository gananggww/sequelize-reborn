const crypto = require('crypto');
var randomBytes = require('random-bytes')

function secret(password,secret) {
  // const secret = 'abcdefg';
  const hash = crypto.createHmac('sha256', secret)
  .update("ilovehari")
  .digest('hex');
    return hash;

}

function random(len) {
  return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0,len)
}
// console.log(random(8));


module.exports = {secret, random}
