import './style.css';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from './public/firebase/firebaseConnection';

const email = '';
const senha = '';
const user = '';
const idade = '';
const users = [];
const loginUser = false;
const detalheUser = {};

const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const userInput = document.getElementById('user');
const idadeInput = document.getElementById('idade');
const cadastrarEmailBtn = document.getElementById('cadastrarEmail');
const loginBtn = document.getElementById('login');
const cadastrarUserBtn = document.getElementById('cadastrarUser');
const buscarUsersBtn = document.getElementById('buscarUsers');

emailInput.addEventListener('input', (evento) => email = evento.target.value);
senhaInput.addEventListener('input', (evento) => senha = evento.target.value);
userInput.addEventListener('input', (evento) => user = evento.target.value);
idadeInput.addEventListener('input', (evento) => idade = evento.target.value);

cadastrarUserBtn.addEventListener('click', cadastrar);
buscarUsersBtn.addEventListener('click', buscarTodosUsers);

async function cadastrar() {
  const refDoc = collection(db, 'user');
  await addDoc(refDoc, {
    user: user,
    idade: idade
  })
  .then(() => {
    console.log('Deu tudo certo!!');
    userInput.value = '';
    idadeInput.value = '';
  })
  .catch((erro) => {
    console.log('Ocorreu um erro ' + erro);
  })
}

async function buscarTodosUsers() {
  const refDoc = collection(db, 'user');
  await getDocs(refDoc)
  .then((snapshot) => {
    let lista = [];

    snapshot.forEach((cadaUser) => {
      lista.push({
        id: cadaUser.id,
        user: cadaUser.data().user,
        idade: cadaUser.data().idade
      });
    });

    users = lista;
    renderizaUser();
  })
  .catch((erro) => {
    console.log('Houve um erro!! ' + erro)
  })
}

function renderizaUser() {
  document.getElementById('listaUser').innerHTML = users.map((user) => {
    return `
      <li>
        <strong>ID: ${user.id}</strong>
        <span>User: ${user.user}</span>
        <span>Idade: ${user.idade}</span>
        <button onclick="excluirUser('${user.id}')">Excluir</button>
        <button onclick="atualizarUser('${user.id}')">Editar</button>
      </li>
    `;
  })
  
}

function render() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div className='container'>
      <h2>Cadastro Email e Senha</h2>

      <label>Email:</label>
      <input id="email" type="email" placeholder="Digite seu email"/> 

      <br/><br/>

      <label>Senha:</label>
      <input id="senha" type="password" placeholder="Digite sua senha"/>

      <br/><br/>

      <button id="cadastrarEmail">Cadastrar</button>
      <button id="login">Login</button>
    </div>

      <br/><br/>
      <hr/>

    <div className='container'>
      <h2>Cadastro User e Idade</h2>

      <label>User:</label>
      <input id="user" type="text" placeholder="Digite seu user"/>

      <br/><br/>

      <label>Idade:</label>
      <input id="idade" type="text" placeholder="Digite sua idade"/>

      <br/><br/>

      <button id="cadastrarUser">Cadastrar</button>
      <button id="buscarUsers">Buscar usuários</button>

      <div id="flex">
        <ul id="listaUser"></ul>
      </div>
    </div>
  `;
}

render();