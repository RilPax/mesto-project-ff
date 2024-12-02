async function fetchCards() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
    headers: {
      authorization: '2f9bc796-ad38-4ea7-a369-376b91155c43'
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export { fetchCards };