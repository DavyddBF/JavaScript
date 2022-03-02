console.log(`Trabalhando com listas`)
// const salvador = `Salvador`;
// const saoPaulo = `São Paulo`;
// const rioDeJaneiro = `Rio de Janeiro`;

//criando arrays
const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`
);

listaDeDestinos.push(`Curitiba`); //adicionando itens na lista

console.log("Destinos possíveis:");
console.log(listaDeDestinos);

listaDeDestinos.splice(1, 1); //retirando itens da lista
console.log(listaDeDestinos);

console.log(listaDeDestinos[1], listaDeDestinos[0]); /*dizendo qual parte da 
lista quero imprimir no console.log*/