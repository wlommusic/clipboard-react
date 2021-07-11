import Todos from "./Todos";
import { auth } from "./firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faSignInAlt
} from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import "./App.css";

const signInWithGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

const SignIn = () => {
  return (
    <div>
      <button className="signin" onClick={signInWithGoogle}>
        <FontAwesomeIcon icon={faSignInAlt} className="icons" size="lg" />
        <span className='signin2'>SignIn</span>
      </button>
    </div>
  );
};
const App = () => {
  const [user] = useAuthState(auth);
  return user ? <Todos /> : <SignIn />;
         

};

export default App;
