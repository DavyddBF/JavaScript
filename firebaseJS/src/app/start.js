const nodemon = require('nodemon');
const { exec } = require('child_process');

const liveServer = 'live-server --port=4000 --proxy=localhost:3000';
let browserAberto = false;

const limparTerminal = () => {
    try {
        process.stdout.write('\x1B[2J\x1B[0f');
    } catch (error) {
        console.error('Erro ao limpar o terminal', error.message);
    }
}

nodemon({
    script: './src/app/app.js',
    ext: 'js html css',
    ignore: ['../../node_modules/']
});

nodemon.on('start', () => {
    console.log('\nNodemon iniciou o servidor!!');

    if(!browserAberto) {
        exec(liveServer);
        browserAberto = true;
    }
})
.on('restart', (files) => {
    limparTerminal();
    console.log('Nodemon reiniciou o servidor!!');

    if(files) {
        limparTerminal()
        console.log(`Os seguintes arquivos foram modificados: ${files}`);
    }

    setTimeout(() => {
        if(!browserAberto) {
            exec(liveServer);
            browserAberto = true;
        }
    }, 1000);
});

nodemon.on('crash', () => {
    console.error('O servidor nodemon falhou e será reiniciado!!');
    nodemon.restart();
});

