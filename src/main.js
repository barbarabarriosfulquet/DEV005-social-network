import './Components/firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Components/firebase.js';
import register from './Components/register.js';
import login from './Components/login.js';
import loginGoogle from './Components/logginGoogle.js';
import logout from './Components/logout';
import error404 from './Components/error404.js';
import { async } from 'regenerator-runtime';


const root = document.getElementById('root');
// creando rutas
const routes = [
  { path: '/', component: register },
  { path: '/login', component: login },
  { path: '/loginGoogle', component: loginGoogle },
  { path: '/error404', component: error404 },
  { path: '/logout', component: logout },
];
// de tal manera puedo disparar que usuario esta autenticado
//onAuthStateChanged(auth, async(user)=>{
 //if(user){

 //}else{

 //}
//})
const defaultRoute = '/';

function navigateTo(hans) {
  const route = routes.find((routeFind) => routeFind.path === hans);
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error404');
  }
}
window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
