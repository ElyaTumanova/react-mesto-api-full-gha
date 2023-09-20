export {validationConfig, 
  popupPlace, popupProfile, popupPhoto, popupDelete, popupAvatarEdit,
  popupPlaceForm, popupProfileForm,popupProfileName, popupProfileDescripton,
  newPlaceButton, placeCards,
  profileEditButton,profileName, profileDescripton,
  popupAvatarForm, profileAvatar, profileAvatarLink, profileAvatarEditButton}


//валидация

const validationConfig = {
  formSelector: 'form',
  inputSelector: 'form__input',
  submitButtonSelector: 'form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  errorClass: 'form__input_disabled'
}

// попапы
const popupPlace = document.querySelector('.popup_place');
const popupProfile = document.querySelector('.popup_profile');
const popupPhoto = document.querySelector('.popup_photo');
const popupDelete = document.querySelector('.popup_delete-confirm');
const popupAvatarEdit = document.querySelector('.popup_update-avatar');

// формы
const popupPlaceForm = document.forms ['placeForm'];
const popupProfileForm = document.forms ['profileForm'];
const popupProfileName = popupProfileForm.querySelector('.profile-form__input_type_name');
const popupProfileDescripton = popupProfileForm.querySelector('.profile-form__input_type_descripton');

// место
const newPlaceButton = document.querySelector('.profile__add-button');
const placeCards = document.querySelector('.places');

// профиль
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescripton = document.querySelector('.profile__description'); 

//аватар
const popupAvatarForm = document.forms ['avatarForm'];
const profileAvatar = document.querySelector('.profile__avatar-wrap');
const profileAvatarLink =  document.querySelector('.profile__avatar');
const profileAvatarEditButton = document.querySelector('.profile__avatar-edit');