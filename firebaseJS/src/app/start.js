const nodemon = require('nodemon');
const browserSync = require('browser-sync').create();
const path = require('path');

nodemon({
    script: './src/app/app.js',
    ext: 'js html css',
    ignore: ['../../node_modules/']
});

nodemon.on('start', () => {
    console.log('Nodemon iniciou o servidor!!');
}).on('restart', () => {
    console.log('Nodemon reiniciou o servidor!!');
    setTimeout(() => {
        browserSync.reload();
    }, 1000);
});

nodemon.on('crash', () => {
    console.error('O servidor nodemon falhou e será reiniciado!!');
    nodemon.restart();
});

browserSync.init({
    proxy: 'https://localhost:3000/',
    files: ['*.js', '*.html', '*.css'],
    port: 4000,
    open: false
});