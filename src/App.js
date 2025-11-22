import React, { useState } from 'react';
import './login.css';
import './App.css';

const App = () => {
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
const validateFunction = () => {
  if(Name=="")
  {
    alert("Please fill name !");
  }
  else if(Password=="")
  {
    alert("Please fill password !");
  }
 
}
  return (
    <>
    <form className="wrapper">
 <h2>Admin Login</h2>
    <section className="group">
        <input
            type="text"
            size="30"
            className="input"
            name="namr"
            value={Name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
        />
        <label htmlFor="email" className="label">
            Username
        </label>
    </section>
    <section className="group">
        <input
            type="password"
            minLength="8"
            className="input"
            name="password"
            value={Password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
        />
        <label htmlFor="password" className="label">
            Password
        </label>
    </section>
    <button onClick = {validateFunction} type="button" className="btn">
        LOGIN
    </button>
    <span className="footer"></span>
</form>
    </>
  )
}

export default App;