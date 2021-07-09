import logo from './logo.svg';
import Todos from './Todos'
import Footer from './footer.component';
import {auth} from './firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase';
import './App.css';



const signInWithGoogle =()=>auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

const SignIn =()=>{
  return(<div>
    <button className='signin' onClick={signInWithGoogle}>signIn &hearts;</button>
    
  </div>)
}
const App =()=>{
  
  const [user] = useAuthState(auth);
  return user  ? <Todos/> : <SignIn/>
};

export default App;