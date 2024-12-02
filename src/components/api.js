export function deleteApi(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '2f9bc796-ad38-4ea7-a369-376b91155c43'
    }
  })
}

export function setLike(item ,method) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${item._id}`, {
    method: method,
    headers: {
      authorization: '2f9bc796-ad38-4ea7-a369-376b91155c43'
    }
  })
}

export function profileInfoRequest() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
    headers: {
      authorization: '2f9bc796-ad38-4ea7-a369-376b91155c43'
    }
  })
}

export function editProfileData(editName, editDescription) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '2f9bc796-ad38-4ea7-a369-376b91155c43',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: editName,
      about: editDescription
    })
  })
}
  
export function editProfileAvatar(newAvatar) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '2f9bc796-ad38-4ea7-a369-376b91155c43',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: newAvatar.value
    })
  })
}

export function requestPostCard(placeName, placeLink) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
      method: 'POST',
      headers: {
        authorization: '2f9bc796-ad38-4ea7-a369-376b91155c43',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: placeName,
        link: placeLink,
      })
    })
  }

  export function loginToProfile() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
      headers: {
        authorization: '2f9bc796-ad38-4ea7-a369-376b91155c43'
      }
    })
  }