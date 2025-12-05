const crypto = require('crypto');

// Generate a random 64-byte hex string
const secret = crypto.randomBytes(64).toString('hex');

console.log('Generated JWT_SECRET:', secret);


// 721008c1ac4e2093fc353b01e9100d1b8459e955b0021d9ec53089da0fee7ea7defe0d961f6d5b765efad45b45a313d363bebff7078406e8fd0194d90397ca70