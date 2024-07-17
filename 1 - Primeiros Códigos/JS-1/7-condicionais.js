console.log(`Trabalhando com condicionais`)

//criando arrays
const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`
);

const idadeComprador = 18;
const estaAcompanhado = false;
const temPassagemComprada = true;

console.log("Destinos possíveis:");
console.log(listaDeDestinos);

// if (idadeComprador >= 18) {

//     console.log("Comprador maior de idade");
//     listaDeDestinos.splice(1, 1); //retirando itens da lista
// } else if (estaAcompanhada) {

//     console.log("Comprador(a) está acompanhado(a)");
//     listaDeDestinos.splice(1, 1); //retirando itens da lista
// } else {
//     console.log("Não é maior de idade, não poderei lhe vender");
// }


// "||" = "OU"
// "&&" = "E"
if (idadeComprador >= 18 || estaAcompanhado) {

    console.log("Boa viagem!!");
    listaDeDestinos.splice(1, 1); //retirando itens da lista
}else {
    console.log("Não é maior de idade, não poderei lhe vender");
}

console.log("Embarque: \n\n"); // "\n" pula linha
if(idadeComprador >= 18 && temPassagemComprada) {
    console.log("Boa viagem!!");
}else {
    console.log("Você não pode embarcar");
}

console.log(listaDeDestinos);
