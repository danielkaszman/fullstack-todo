import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { MdOutlineArrowRight } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { userContext } from "../context/userContext";

function Todo() {
  const [todolist, setTodolist] = useState([]);
  const [select, setSelect] = useState("all");
  const inputField = useRef();

  const { user } = useContext(userContext);

  useEffect(() => {
    getTodos();
  }, [user]);

  function getTodos() {
    inputField.current.value = "";
    if (user) {
      axios
        .post("http://localhost:3001/todos/getTodos", {
          email: user.email,
        })
        .then((response) => {
          setTodolist(response.data);
        });
    }
  }

  function saveTodo() {
    const saveText =
      inputField.current.value.charAt(0).toUpperCase() +
      inputField.current.value.slice(1).toLowerCase();
    axios
      .post("http://localhost:3001/todos/saveTodo", {
        email: user.email,
        todo: saveText,
      })
      .then(() => {
        getTodos();
      });
  }

  function updateTodo(id, completed) {
    axios
      .put(`http://localhost:3001/todos/updateTodo/${id}`, { completed })
      .then(() => {
        getTodos();
      });
  }

  function deleteTodo(id) {
    axios.delete(`http://localhost:3001/todos/deleteTodo/${id}`).then(() => {
      getTodos();
    });
  }

  return (
    <Container>
      <Content>
        <h1>ToDo List</h1>
        <Inputs>
          <input
            type="text"
            ref={inputField}
            disabled={user ? false : true}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                if (event.target.value.length > 0) {
                  saveTodo();
                }
              }
            }}
          />
          <select
            disabled={user ? false : true}
            onChange={(event) => setSelect(event.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </Inputs>
        {user ? (
          <TodoListWrap>
            {todolist &&
              todolist.map((todo) => {
                return (
                  <TodoList
                    key={todo._id}
                    completed={todo.completed}
                    select={select}
                  >
                    <ArrowIcon>
                      <MdOutlineArrowRight />
                    </ArrowIcon>
                    <label completed={todo.completed}>{todo.todo}</label>
                    <CheckIcon
                      onClick={() => updateTodo(todo._id, !todo.completed)}
                    >
                      <BsCheck2 />
                    </CheckIcon>
                    <DeleteIcon onClick={() => deleteTodo(todo._id)}>
                      <IoTrashOutline />
                    </DeleteIcon>
                  </TodoList>
                );
              })}
          </TodoListWrap>
        ) : (
          <PlsLogin>
            <h2>Please login or create an account!</h2>
          </PlsLogin>
        )}
      </Content>
    </Container>
  );
}

export default Todo;

const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 50px;
  min-height: calc(100vh - 50px);
  z-index: 0;
`;

const PlsLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  h2 {
    color: white;
    font-size: 50px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: white;
    font-size: 90px;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;

  input {
    height: 40px;
    width: 250px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    padding: 15px;
    margin-inline: 5px;

    :focus {
      outline-color: white;
    }
  }

  select {
    height: 40px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    padding-inline: 15px;
    margin-inline: 5px;

    :focus {
      outline: none;
    }
  }
`;

const TodoListWrap = styled.div`
  margin-top: 20px;
`;

const TodoList = styled.div`
  display: ${(props) => {
    if (props.select === "completed" && props.completed === false) {
      return "none";
    } else if (props.select === "uncompleted" && props.completed === true) {
      return "none";
    } else {
      return "flex";
    }
  }};
  align-items: center;

  background-color: ${(props) =>
    props.completed ? "rgba(255, 255, 255, 0.707)" : "white"};
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
  margin-top: 10px;

  label {
    flex: 1;
    padding-right: 15px;
    text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  }
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
  height: 40px;
  width: 40px;
`;

const CheckIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;
  font-size: 20px;
  cursor: pointer;
  background-color: rgb(27, 153, 27);
`;

const DeleteIcon = styled(CheckIcon)`
  background-color: rgb(226, 17, 17);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
