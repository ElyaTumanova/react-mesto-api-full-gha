import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar,isLoading}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateAvatar (values.link)
  }
  useEffect (()=>{
    resetForm();
  },[isOpen])

  return (
    <PopupWithForm name={'avatar'} 
    title={'Обновить аватар'} 
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit} 
    submitButtonText = {'Сохранить'}
    isLoading={isLoading}
    isValid={isValid}>
      <div className="form__input-wrap">
        <input type="url" 
        //ref={avatarRef}
        value = {values.link||""}
        name="link"
        placeholder="Ссылка на аватар" 
        className={`form__input avatar-form__input avatar-form__input_type_link ${errors.link ? 'form__input_disabled':''}`}
        required
        noValidate
        onChange={handleChange}/>

        <div className="form__error-message avatarImageLink-error-message">{errors.link}</div>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;