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
      <input/> 

      <br/><br/>

      <label>Senha:</label>
      <input/>

      <br/><br/>

      <button>Cadastrar</button>
      <button>Login</button>
    </div>

      <br/><br/>
      <hr/>

    <div className='container'>
      <h2>Cadastro User e Idade</h2>

      <label>User:</label>
      <input/>

      <br/><br/>

      <label>Idade:</label>
      <input/>

      <br/><br/>

      <button>Cadastrar</button>
      <button>Buscar usuários</button> <br/>

    </div>
  `;
}

render();