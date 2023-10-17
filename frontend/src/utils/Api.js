class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = localStorage.getItem('token');
  }

  getCards () {
    return this._request (`${this._url}/cards`,
    {
      headers: {
        authorization: `0573a051-c261-46c2-9f99-9d24a33a3c63`,
        'Content-type': 'application/json'
      },
    })
  }

  addCard (card) {
    return this._request (`${this._url}/cards`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this._authorization}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
  }

  deleteCard (cardId) {
    return this._request (`${this._url}/cards/${cardId}`, 
    {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this._authorization}`,
        'Content-type': 'application/json'
      },
    })
  }

  likeCard (cardId) {
    return this._request (`${this._url}/cards/${cardId}/likes`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${this._authorization}`,
        'Content-type': 'application/json'
      },
    })
  }

  deleteLikeCard (cardId) {
    return this._request (`${this._url}/cards/${cardId}/likes`,
    {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this._authorization}`,
        'Content-type': 'application/json'
      },
    })
  }


  getUserInfo () {
    return this._request (`${this._url}/users/me`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this._authorization}`,
        'Content-type': 'application/json'
      },
    })
  }

  upadateUserInfo (userData) {
    return this._request (`${this._url}/users/me`,
    {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this._authorization}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
  }

  changeAvatar (avatarLink) {
    return this._request (`${this._url}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this._authorization}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
  }

  _handleResponse (res) {
    if (res.ok) {
      return res.json()
     } else {
       return Promise.reject(`Ошибка: ${res.status}`)
     }
  }

  _request (url, options) {
    return fetch(url, options).then(this._handleResponse)
  }
} 

export const api = new Api ({
  url: 'https://api.elya.mesto.nomoredomainsrocks.ru',
  headers: {
    'Accept':'application/json',
    'Content-Type':'application/json',
    // authorization: '0573a051-c261-46c2-9f99-9d24a33a3c63'
  }
})