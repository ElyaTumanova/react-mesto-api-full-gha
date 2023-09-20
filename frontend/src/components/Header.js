import { useEffect,useState } from 'react';
import Logo from '../images/header__logo.svg'
import {useLocation, useNavigate} from 'react-router-dom';

function Header ({userEmail, loggedIn, onSignout}) {

  const [authPage, setAuthPage] = useState('');
  const navigate = useNavigate ();
  const location = useLocation();

  useEffect(()=>{
    setAuthPage (location)
  })

  return (
    <header className="header page__header">
      <img src={Logo} alt="Логотип" className="header__logo"/>
      <div className="header__wrap">
        <p className="header__email">{userEmail}</p>
        {!loggedIn &&  authPage.pathname === '/sign-in' && <button className="header__button" onClick={()=>{navigate('/sign-up')}}>Регистрация</button>}
        {!loggedIn &&  authPage.pathname === '/sign-up' && <button className="header__button" onClick={()=>{navigate('/sign-in')}}>Войти</button>}
        {loggedIn && <button className="header__button" onClick={onSignout}>Выйти</button>}
      </div>
    </header>
  )
}

export default Header;