import Header from './Header.js'
import Footer from './Footer.js'
import Main from './Main.js'
import ImagePopup from './ImagePopup.js'
import DeleteCardPopup from './DeleteCardPopup.js'
import Register from './Register.js'
import Login from './Login.js'
import InfoTooltip from './InfoTooltip.js'
import React, {useState, useEffect} from 'react'
import {api} from '../utils/Api.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import { Routes, Route, useNavigate,useLocation} from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import * as Auth from '../utils/Auth.js'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState (false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState (false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState (false);
  const [selectedCard, setSelectedCard] = useState (null);
  const [avatarEditButton, setAvatarEditButton] = useState (false);
  const [avatarDarkness, setAvatarDarkness] = useState(false);
  const [currentUser, setCurrentUser] = useState ({});
  const [cards, setCards ] = useState ([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState (false);
  const [cardToDelete, setCardToDelete] = useState ({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isRegisteredPopupOpen, setIsRegisteredPopupOpen] = useState(false);
  const [isRegistered,setIsRegistered] = useState(false);

  const navigate = useNavigate ();

  useEffect (()=>{  
    api.getCards()
    .then (function (res) {
      console.log(res);
      setCards(res)
    })
    .catch((err)=>console.log (`catch:${err}`));
  }, [])

  useEffect (()=> {  
    api.getUserInfo()
    .then (function (res) {
      setCurrentUser(res)
    })
    .catch((err)=>console.log (`catch:${err}`));
  },[])

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsRegisteredPopupOpen(false);
    setSelectedCard(null);
  }
  

  function handleCardClick (card) {
    setSelectedCard (card)
  }

  function avatarMouseEnter () {
    setAvatarEditButton(true);
    setAvatarDarkness (true);
  }
  
  function avatarMouseLeave () {
    setAvatarEditButton(false);
    setAvatarDarkness (false);
  }

  function handleCardLike(card) {
    console.log(card);
    console.log(card.likes);
    console.log(currentUser._id);
    const isLiked = card.likes.some(i => i === currentUser._id);
    console.log(isLiked)
    if (!isLiked) {
      api.likeCard(card._id)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch((err)=>console.log (`catch:${err}`));;
    } else {
      api.deleteLikeCard(card._id)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch((err)=>console.log (`catch:${err}`));;
    }
  }

  function handleSubmit (request) {
    setIsLoading(true);
    request()
    .then(closeAllPopups)
    .catch((err)=>console.log (`catch:${err}`))
    .finally(() => {setIsLoading(false)});
  }

  function handleCardDelete (card) {
    function makeRequest () {
      return api.deleteCard(card._id).then((res) => {
        console.log (res)
        setCards((state) => state.filter((c) => c._id != card._id));
      })
    }
    handleSubmit (makeRequest);
  }

  function onUpdateUser (user) {
    function makeRequest () {
      return api.upadateUserInfo(user)
      .then (function (res) {
        setCurrentUser(res);
      })
    }
    handleSubmit (makeRequest);
  }

  function onUpdateAvatar (link) {
    function makeRequest () {
      return api.changeAvatar(link)
      .then (function (res) {
        setCurrentUser(res);
      })
    }
    handleSubmit (makeRequest);
  }

  function handleAddPlaceSubmit (card) {
    function makeRequest () {
      return api.addCard(card)
      .then(function(res) {
        setCards([res, ...cards]);
      })
    }
    handleSubmit (makeRequest);
  } 
  
  function handleDeleteCardClick (card) {
    setIsCardDeletePopupOpen (true);
    setCardToDelete(card)
  }

  function hangleLogin (token) {
    console.log(token)
    Auth.authorize(token)
    .then ((res)=>{
      console.log(res);
      console.log(res.email);
      setLoggedIn(true);
      setUserEmail(res.email);
      navigate ('/');
    })
    .catch((err)=>console.log (`catch:${err}`));
  }

  function handleSignout () {
    localStorage.setItem('token','');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in');
  }

  function handleRegistration (result) {
    setIsRegisteredPopupOpen(true);
    setIsRegistered(result);
  }


  useEffect(()=> {
    tockenChek()
  },[])
  
  function tockenChek () {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      Auth.authorize (token)
      .then((res) => {
        console.log(res);
        if(res) {
          setLoggedIn(true);
          setUserEmail(res.email)
          navigate('/')
        }
      })
      .catch((err)=>console.log (`catch:${err}`))
    }
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className = "page">
          <Header userEmail={userEmail} loggedIn={loggedIn} onSignout={handleSignout}/>
          <Routes>
            <Route path="/sign-up" element={<Register onRegistration={handleRegistration}/>} />
            <Route path="/sign-in" element={<Login onLogin={hangleLogin}/>} />
            <Route path="/" 
            element={<ProtectedRouteElement element={Main} 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick = {handleCardClick}
              avatarMouseEnter = {avatarMouseEnter}
              avatarMouseLeave = {avatarMouseLeave}
              isAvatarEditButtonActive = {avatarEditButton}
              isAvatarDarknessActive = {avatarDarkness}
              onCardLike ={handleCardLike}
              onCardDelete = {handleDeleteCardClick}
              cards = {cards} 
              loggedIn={loggedIn}/>}/>
          </Routes>
          <Footer/>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={onUpdateUser}
            isLoading={isLoading}/>
         <AddPlacePopup
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}/>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={onUpdateAvatar}
            isLoading={isLoading}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <DeleteCardPopup 
          isOpen={isCardDeletePopupOpen} 
          onClose={closeAllPopups} 
          onCardDelete={handleCardDelete} 
          cardToDelete={cardToDelete}
          isLoading={isLoading}/>
          <InfoTooltip 
          isRegisteredPopupOpen={isRegisteredPopupOpen}
          onClose={closeAllPopups}
          isRegistered={isRegistered}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
