export async function deleteApi(cardId, baseUrl, { getResponseData }) {
  return fetch(`${baseUrl.link}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: baseUrl.token
    }
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export async function setLike(item, method, baseUrl, { getResponseData }) {
  return fetch(`${baseUrl.link}/cards/likes/${item._id}`, {
    method: method,
    headers: {
      authorization: baseUrl.token
    }
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export async function profileInfoRequest(baseUrl, { getResponseData }) {
  return fetch(`${baseUrl.link}/users/me`, {
    headers: {
      authorization: baseUrl.token
    }
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export async function editProfileData(editName, editDescription, baseUrl, { getResponseData }) {
  return fetch(`${baseUrl.link}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: baseUrl.token,
      'Content-Type': baseUrl.tipeOfContent
    },
    body: JSON.stringify({
      name: editName,
      about: editDescription
    })
  })
  .then((res) => {
    return getResponseData(res)
  })
}
  
export async function editProfileAvatar(newAvatar, baseUrl, { getResponseData }) {
  return fetch(`${baseUrl.link}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: baseUrl.token,
      'Content-Type': baseUrl.tipeOfContent
    },
    body: JSON.stringify({
      avatar: newAvatar.value
    })
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export async function requestPostCard(placeName, placeLink, baseUrl, { getResponseData }) {
    return fetch(`${baseUrl.link}/cards`, {
      method: 'POST',
      headers: {
        authorization: baseUrl.token,
        'Content-Type': baseUrl.tipeOfContent
      },
      body: JSON.stringify({
        name: placeName,
        link: placeLink,
      })
    })
    .then((res) => {
      return getResponseData(res)
    })
  }