import './style.css';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './public/firebase/firebaseConnection';

const user = '';
const idade = '';
const email = '';
const senha = '';
const users = [];
const loginUser = false;
const detalheUser = {};


function render() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div className='container'>
      <h2>Cadastro Email e Senha</h2>

      <label>Email:</label>
      <input id="email" type="email" placeholder="Digite seu email"/> 

      <br/><br/>

      <label id="senha">Senha:</label>
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
    </div>
  `;
}

render();