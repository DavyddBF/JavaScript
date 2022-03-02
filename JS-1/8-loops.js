console.log(`\n Trabalhando com condicionais`)

//criando arrays
const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`
);

const idadeComprador = 18;
const estaAcompanhado = false;
let temPassagemComprada = false;
const destino = "Curitiba";

console.log("\n Destinos possíveis:");
console.log(listaDeDestinos);

// "||" = "OU"
// "&&" = "E"
const podeComprar = idadeComprador >= 18 || estaAcompanhado;

let contador = 0;
let destinoExiste = false;
while(contador < 3) {
    

    if (listaDeDestinos[contador] == destino) {

        destinoExiste = true;
        break;
    }
    contador += 1;
}

console.log("Destino existe: ", destinoExiste);

if(podeComprar && destinoExiste) {

    console.log("Boa viagem!!")
}else {

    console.log("Desculpe, tivemos um erro!")
}

for(let cont = 0; cont < 3; cont ++) {
    
    if (listaDeDestinos[contador] == destino) {

        destinoExiste = true;
        break;
    }
}