import React, {useState, useEffect } from 'react'
import Card from './Card.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function Main ({onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  onCardClick, 
  avatarMouseEnter, 
  avatarMouseLeave, 
  isAvatarEditButtonActive,
  isAvatarDarknessActive, 
  onCardLike,
  onCardDelete,
  cards}) {


  const currentUser = React.useContext(CurrentUserContext);

  console.log (cards);

  return (
    <main className="page__content">
      <section className="profile page__profile">
        <div className="profile__avatar-wrap" onClick={onEditAvatar} onMouseEnter={avatarMouseEnter} onMouseLeave={avatarMouseLeave}>
          <img src={currentUser.avatar} alt="Аватарка" className={`profile__avatar ${isAvatarDarknessActive ? 'profile__avatar_active' : ''}`}/>
          <button className={`profile__avatar-edit ${isAvatarEditButtonActive ? 'profile__avatar-edit_active' : ''}`}></button>
        </div>
        
          <div className="profile__info">
            <div className="profile__name-wrap">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>  
      </section>
      <section className="places">
        {cards.data.map (card =>
          (<Card card = {card} 
          key={card._id} 
          onCardClick = {onCardClick} 
          onCardLike = {onCardLike} 
          onCardDelete = {onCardDelete}/>)
        )}
      </section>
    </main>
  )
}

export default Main;