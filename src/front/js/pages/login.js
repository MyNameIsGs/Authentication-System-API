import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    if (store.token && store.token !== "" && store.token !== undefined) {
      navigate("/");
    } else {
      try {
        const resp = await fetch(
          "https://3001-4geeksacade-reactflaskh-5qcok9i3tkc.ws-us93.gitpod.io/api/token",
          opts
        );

        if (resp.status !== 200) {
          alert("There has been some error");
          return;
        }

        const data = await resp.json();
        console.log("this came from the backend", data);
        sessionStorage.setItem("token", data.access_token);
        await actions.login(email, password);
        navigate("/");
      } catch (error) {
        console.error("There was an error", error);
      }
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      {store.token && store.token !== "" && store.token !== undefined ? (
        <div>You are logged in with this token: {store.token}</div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>Login</button>
        </div>
      )}
    </div>
  );
};
