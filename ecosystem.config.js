module.exports = {
    apps: [
        {
            name: 'panisani.honest-family.com',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            port: 3021, // yoru app port
            instances: 'max',
            exec_mode: 'cluster',
            cwd: './'
        }
    ]
};
