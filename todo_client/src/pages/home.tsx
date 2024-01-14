import { useState, useEffect } from "react";
import "./home.module.css";
import axios from "axios";

interface Todo {
  title: string;
  description: string;
  _id: string;
}

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  function submitForm(e: any) {
    e.preventDefault();
    console.log(title);
    console.log(content);
    axios
      .post("http://localhost:8000/new", {
        title: title,
        description: content,
      })
      .then((e) => {
        console.log(e);
        axios.get("http://localhost:8000/").then((e) => {
          console.log(e);
          setTodos(e.data.todos);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    axios.get("http://localhost:8000/").then((e) => {
      console.log(e);
      setTodos(e.data.todos);
    });
  }, []);

  function deleteTodo(id: string) {
    axios
      .get(`http://localhost:8000/${id}`)
      .then((e) => {
        console.log(e);
        axios.get("http://localhost:8000/").then((e) => {
          console.log(e);
          setTodos(e.data.todos);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <h1>Add a TODO</h1>
      <form id="addTodo" onSubmit={submitForm}>
        <label>Add a title</label>
        <input
          name="title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Add a content</label>
        <input
          name="content"
          placeholder="Content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add TODO</button>
      </form>
      {todos.map((e) => {
        return (
          <div key={e._id}>
            <h1>{e.title}</h1>
            <p>{e.description}</p>
            <button onClick={(_) => deleteTodo(e._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
