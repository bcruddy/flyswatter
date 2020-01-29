module.exports = {
    https: true,
    port: 3000,
    path: './',
    proxy: {
        '/api': 'http://localhost:3030/api'
    }
};
