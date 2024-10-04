module.exports = {
    // Encode a string to Base64
    encodeToBase64: (input) => {
      return Buffer.from(input).toString('base64');
    },
  
    // Decode a Base64 encoded string
    decodeFromBase64: (encoded) => {
      return Buffer.from(encoded, 'base64').toString('utf-8');
    },
  
    // Encode a binary buffer to Base64
    encodeBufferToBase64: (buffer) => {
      return buffer.toString('base64');
    },
  
    // Decode a Base64 encoded string to a buffer
    decodeBase64ToBuffer: (encoded) => {
      return Buffer.from(encoded, 'base64');
    },
  
    // Encode JSON object to Base64
    encodeJsonToBase64: (jsonObject) => {
      const jsonString = JSON.stringify(jsonObject);
      return Buffer.from(jsonString).toString('base64');
    },
  
    // Decode Base64 string to JSON object
    decodeBase64ToJson: (encoded) => {
      const jsonString = Buffer.from(encoded, 'base64').toString('utf-8');
      return JSON.parse(jsonString);
    }
  };

  
















  const base64Helper = require('./base64Helper');

// Example: Encode a string to Base64
const encoded = base64Helper.encodeToBase64('Hello, world!');
console.log('Encoded:', encoded);  // Output: "SGVsbG8sIHdvcmxkIQ=="

// Example: Decode from Base64
const decoded = base64Helper.decodeFromBase64(encoded);
console.log('Decoded:', decoded);  // Output: "Hello, world!"

// Example: Encode a JSON object to Base64
const jsonObject = { name: 'John', age: 30 };
const encodedJson = base64Helper.encodeJsonToBase64(jsonObject);
console.log('Encoded JSON:', encodedJson);

// Example: Decode Base64 to JSON object
const decodedJson = base64Helper.decodeBase64ToJson(encodedJson);
console.log('Decoded JSON:', decodedJson);

// Example: Encode a buffer to Base64
const buffer = Buffer.from([0x01, 0x02, 0x03, 0x04]);
const encodedBuffer = base64Helper.encodeBufferToBase64(buffer);
console.log('Encoded Buffer:', encodedBuffer);  // Output: "AQIDBA=="

// Example: Decode Base64 to buffer
const decodedBuffer = base64Helper.decodeBase64ToBuffer(encodedBuffer);
console.log('Decoded Buffer:', decodedBuffer);
