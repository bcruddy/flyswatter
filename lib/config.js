const fs = require('fs');

module.exports = () => {
    const path = `${process.cwd()}/flyswatter.config.js`;
    if (!fs.existsSync(path)) {
        throw new Error(`[flyswatter] no config found at: ${path}`);
    }
};
