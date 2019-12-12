import React, { Component } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../queries";

import { useField } from "../hooks/index";

const Login = props => {
  const [username] = useField("text");
  const [password] = useField("password");

  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      console.log(login);
      window.localStorage.setItem(
        "loggedLibraryAppUser",
        JSON.stringify(login.value)
      );
    }
  });

  const handleLogin = async event => {
    event.preventDefault();
    await login({
      variables: {
        username: username.value,
        password: password.value
      }
    });
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Kirjaudu sisään</h2>

      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input {...username} />
        </div>
        <div>
          salasana
          <input {...password} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  );
};

export default Login;
