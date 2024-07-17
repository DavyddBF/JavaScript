import './style.css';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './public/firebase/firebaseConnection';

function render() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div>
      <h2>Firebase + JS</h2>
    </div>
  `;
}

render();