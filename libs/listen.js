module.exports = (server, {path, port, https: isHttps}) => {
    server.listen(port, () => {
        console.log(`\n\tflyswatter listening on port ${port}
            \n\tcwd: ${process.cwd()}\n\tpath: ${path}\n\thttps: ${isHttps}\n`);
    });
};
