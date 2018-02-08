module.exports = {
    https: true,
    port: 5050,
    path: './',
    proxy: {
        '/api': 'http://localhost:5050/api'
    }
};
