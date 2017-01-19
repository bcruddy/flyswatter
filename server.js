const express = require('express');

module.exports = function server (path = './', port = 9100) {
    const app = express();

    app.use(express.static(path));

    app.listen(port, () => {
        console.log(`\n\tflyswatter listening on port ${port}
            \n\tcwd: ${process.cwd()} \n\tpath: ${path}\n`);
    });
};
