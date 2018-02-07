module.exports = (server, {port, https: isHttps}) => {
    server.listen(port, () => {
        const protocol = isHttps ? 'https' : 'http';
        console.log(`[flyswatter] listening on ${protocol}://localhost:${port}`);
    });
};
