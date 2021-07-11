import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/fontawesome-free-regular";
import firebase, { auth, firestore } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  faClipboardCheck,
  faSignOutAlt,
} 
from "@fortawesome/free-solid-svg-icons";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [todos] = useCollectionData(todosRef, { idField: "id" });

  const signOut = () => auth.signOut();

  const onSubmitTodo = (event) => {
    event.preventDefault();

    setTodo("");
    todosRef.add({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <>
      <header>
        <button className="signout" onClick={signOut}>
        <span className='signin2'>Signout</span>
          <FontAwesomeIcon icon={faSignOutAlt} className="icons" size="lg" />
        </button>
      </header>
      <main>
        <form onSubmit={onSubmitTodo}>
          <input
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add Stuff to the board.."
          />
          <button type="submit">Add</button>
        </form>
        {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
      </main>
    </>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const onCompleteTodo = (id, complete) =>
    todosRef.doc(id).set({ complete: !complete }, { merge: true });

  const onDeleteTodo = (id) => todosRef.doc(id).delete();

  return (
    <div key={id} className="todo">
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
        onClick={() => onCompleteTodo(id, complete)}
      >
        {text}
      </button>
      <button onClick={() => onDeleteTodo(id)}>
        <FontAwesomeIcon icon={faTrashAlt} className="icons" size="lg" />
      </button>
      <button onClick={() => navigator.clipboard.writeText(text)}>
        <FontAwesomeIcon icon={faClipboardCheck} className="icons" size="lg" />
      </button>
    </div>
  );
};

export default Todos;
