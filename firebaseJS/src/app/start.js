const { exec } = require('child_process');
const nodemon = require('nodemon');
const browserSync = require('browser-sync').create();

const limparTerminal = () => {
    exec('clear');
}

nodemon({
    script: './src/app/app.js',
    ext: 'js html css',
    ignore: ['../../node_modules/']
});

nodemon.on('start', () => {
    limparTerminal();
    console.log('Nodemon iniciou o servidor!!');
}).on('restart', (files) => {
    limparTerminal();
    console.log('Nodemon reiniciou o servidor!!');

    if(files) {
        console.log(`Os seguintes arquivos foram modificados: ${files}`);
    }

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
    open: true
});