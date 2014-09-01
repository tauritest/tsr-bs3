module.exports = {
    options: {
        src  : 'app',
        dest : 'dev-build',
        navStates : true
    },
    build: {
        globals: {
            lang    : 'en',
            charset : 'utf-8',
            assets  : 'assets/'
        }
    }
};