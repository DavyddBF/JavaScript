import './style.css';
import { 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDocs, 
  updateDoc } 
  from 'firebase/firestore';
  import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut
  } from 'firebase/auth';
  import { db, auth } from './public/firebase/firebaseConnection';

let email = '';
let senha = '';
let user = '';
let idade = '';
let users = [];
let loginUser = false;
let detalheUser = {};

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

cadastrarEmailBtn.addEventListener('click', novoUsuario);
loginBtn.addEventListener('click', loginUsuario)
cadastrarUserBtn.addEventListener('click', cadastrar);
buscarUsersBtn.addEventListener('click', buscarTodosUsers);

async function carregarUser() {
  const unsub = onSnapshot(collection(db, 'user'), (snapshot) => {
    let listaUser = [];

    snapshot.forEach((cadaUser) => {
      listaUser.push({
        id: cadaUser.id,
        user: cadaUser.data().user,
        idade: cadaUser.data().idade
      });
    });

    users = listaUser;
    renderizaUser();
    renderFilteredUsers();
  });

  return () => unsub();
}

async function checarLogin() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      detalheUser = {
        uid: user.uid,
        email: user.email
      };
      loginUser = true;
      renderLogin();
    } else {
      detalheUser = {};
      loginUser = false;
      renderLogin();
    }
  });
}

async function novoUsuario() {
  await createUserWithEmailAndPassword(auth, email, senha)
  .then(() => {
    console.log('Cadastrado com sucesso!');
    email = '';
    senha = '';
    emailInput.value = '';
    senhaInput.value = '';
  })
  .catch((erro) => {
    if(erro.code == 'auth/weak-password') {
      alert('Senha muito fraca!!');
    } else if(erro.code == 'auth/email-already-in-use') {
      alert('Email já existe!!');
    }
  })
}

async function loginUsuario() {
  await signInWithEmailAndPassword(auth, email, senha)
  .then((value) => {
    console.log('Logado com sucesso!!');
    console.log(value);

    detalheUser = {
      uid: value.user.uid,
      email: value.user.email
    }

    loginUser = true;
    renderLogin()

    email = '';
    senha = '';
    emailInput.value = '';
    senhaInput.value = '';
  })
  .catch(() => {
    console.log('Não foi possível fazer o login!!');
  });
}

async function fazerLogout() {
  await signOut(auth);
  loginUser = false;
  detalheUser = {};
  renderLogin();
}

function renderLogin() {
  if(loginUser) {
    loggedInContainer.style.display = 'block';
    userDetails.textContent  = `Id: ${detalheUser.uid} - Email: ${detalheUser.email}`;
  } else {
    loggedInContainer.style.display = 'none';
    userDetails.textContent = '';
  }
}

async function cadastrar() {
  const refDoc = collection(db, 'user');
  await addDoc(refDoc, {
    user: user,
    idade: idade
  })
  .then(() => {
    console.log('Deu tudo certo!!');
    user = '';
    idade = '';
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
    renderFilteredUsers();
  })
  .catch((erro) => {
    console.log('Houve um erro!! ' + erro)
  })
}

async function excluirUser(id) {
  const refDoc = doc(db, 'user', id);
  await deleteDoc(refDoc)
  .then(() => {
    console.log('User deletado com sucesso!!')
    buscarTodosUsers();
  })
  .catch((erro) => {
    console.log('Houve um erro ao deletar!! ' + erro);
  });
}

async function atualizarUser(id) {
  const refDoc = doc(db, 'user', id);
  await updateDoc(refDoc, {
    user: user,
    idade: idade
  })
  .then(() => {
    console.log('Edição feita com sucesso!!');
    user = '';
    idade = '';
    userInput.value = '';
    idadeInput.value = '';
  })
  .catch((erro) => {
    console.log('Houve um erro!! ' + erro);
  })
}

function renderizaUser() {
  document.getElementById('listaUser').innerHTML = users.map((user) => {
    return `
      <li>
        <strong>ID: ${user.id}</strong> </br>
        <span>User: ${user.user}</span> </br>
        <span>Idade: ${user.idade}</span> </br>
        <button class="excluirUserBtn" data-id="${user.id}">Excluir</button>
        <button class="atualizarUserBtn" data-id="${user.id}">Editar</button>
      </li>
    `;
  }).join('');

  const excluirUserBtn = document.querySelectorAll('excluirUserBtn');
  const atualizarUserBtn = document.querySelectorAll('atualizarUserBtn');

  excluirUserBtn.forEach((btn) => {
    btn.addEventListener('click', (evento) => {
      const userID = document.querySelector('[data-id]');
      excluirUser(userID);
    });
  });

  atualizarUserBtn.forEach((btn) => {
    btn.addEventListener('click', (evento) => {
      const userID = evento.target.getAttribute('data-id');
      atualizarUser(userID);
    });
  });
}

function renderFilteredUsers() {
  const idadeFiltrada = users.filter(user => Number(user.idade) > 20);
  idadeFiltradaList.innerHTML = idadeFiltrada.map((maioresVinte) => `
    <li>
      <strong>ID: ${maioresVinte.id}</strong> <br/>
      <span>User: ${maioresVinte.user}</span> <br/>
      <span>Idade: ${maioresVinte.idade}</span> <br/> <br/>
    </li>
  `).join('');
}