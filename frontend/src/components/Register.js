import * as Auth from '../utils/Auth.js'
import { useState } from 'react';
import { Link } from 'react-router-dom'; 


function Register ({onRegistration}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit (e) {
    e.preventDefault()
    const {email, password} = formValue;
    let result = false
    Auth.register(email, password)
    .then (()=> {
      result = true;
      onRegistration(result);
      })
    .catch((err)=>{
      onRegistration(result);
      console.log (`catch:${err}`)})
  }

  return (
    <div className = "auth">
      <h1 className="auth__header">Регистрация</h1>
      <form className="auth__form login-form" name="loginForm" onSubmit={handleSubmit}>
        <div className="auth__input-wrap">
          <input type="text"
          value={formValue.email}
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

        <button className="auth__submit-button login-form__submit-button">Зарегистрироваться</button>
        <div className="auth__login-caption">Уже зарегистрированы? <Link className="auth__login-link"to="/sign-in">Войти</Link></div>
      </form>
    </div>
  )

}

export default Register;