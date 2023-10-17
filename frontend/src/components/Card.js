import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import React from 'react'

function Card ({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  console.log (card);
  console.log (card.owner);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `place__like ${isLiked && 'place__like_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  } 

  function handleLike() {
    onCardLike(card);
  } 

  function handleDelete() {
    onCardDelete(card);
  } 
 
  return (
    <div className="place">
      {isOwn && <button className="place__delete-btn" type="button" onClick={handleDelete}></button>}
      <div className="place__photo-wrap">
        <img src={card.link} alt={card.name} className="place__photo" onClick={handleClick}/>
      </div>
      <div className="place__name-wrap">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-wrap">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLike}></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>          
    </div>
  )
}

export default Card;