import { useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import * as Auth from '../utils/Auth.js'

function Login ({onLogin}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate ();

  function handleChange (e) {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit (e) {
    e.preventDefault()
    const {email, password} = formValue;
    Auth.login(email, password)
    .then((data) => {
      const token = data.token;
      localStorage.setItem('token', token);
      onLogin (token);
    })
    .catch((err)=>console.log (`catch:${err}`));   
  }

  return (
    <div className = "auth">
      <h1 className="auth__header">Вход</h1>
      <form className="auth__form login-form" name="loginForm" onSubmit={handleSubmit}>
        <div className="auth__input-wrap">
          <input type="text" 
          value = {formValue.email}
          name="email" 
          placeholder="Email" 
          className= "auth__input login-form__input_email"
          required 
          noValidate
          onChange={handleChange}
          />

          <input type="password" 
          value={formValue.password}
          name="password" 
          placeholder="Пароль" 
          className= "auth__input login-form__input_password"
          required 
          noValidate
          onChange={handleChange}
          />
        </div>

        <button className="auth__submit-button login-form__submit-button">Войти</button>
      </form>
    </div>
  )
}

export default Login;