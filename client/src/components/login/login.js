import React, { useState } from "react";
import styles from "./login.module.scss";
import background from "../../images/background.jpg";
function Login({ name, setName }) {
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = (e) => {
    if (!nameInput) return alert("must enter a name");
    setName(nameInput);
  };

  const handleNameChange = ({ target }) => {
    setNameInput(target.value);
  };

  return (
    <div className={styles.login} data-testid="login">
      <img src={background} />
      <div className={styles.loginForm}>
        <label className={styles.formElement}>Please Enter Your Name</label>
        <input className={styles.formElement} type="text" name="login" onChange={handleNameChange} />
        <button className={styles.formElement} type="submit" value="Submit" onClick={handleSubmit}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
