const path = require('path');
const { paths } = require('./Data');

const models = {};

for (const [key, relativePath] of Object.entries(paths)) {
    try {
        const resolvedPath = path.resolve(__dirname, relativePath);
        models[key] = require(resolvedPath);
        console.log(`Successfully loaded model for ${key} & module_path: ${resolvedPath}`);
    } catch (error) {
        console.error(`Error loading model for ${key}:`, error.message);
    }
}

module.exports = models;
