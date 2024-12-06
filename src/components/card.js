export function createCard(item, { deleteCard, handleLike, handleImageClick, getResponseData, setLike }, userId, baseUrl) {
  const card = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = item.name;
  const cardImage = card.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(card, item._id);
  });

  const likeBtn = card.querySelector('.card__like-button');
  const cardLikes = card.querySelector('.likes-quantity');

  likeBtn.addEventListener('click', () => {
    handleLike(likeBtn, cardLikes, item, baseUrl, { getResponseData, setLike });
  });

  if (item.likes.some(like => like._id === userId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  if (cardLikes) {
    cardLikes.textContent = item.likes.length;
  }

  cardImage.addEventListener('click', () => {
    handleImageClick(item.link, item.name);
  });

  return card;
}

export function handleLike(likeButton, cardLikes, item, baseUrl, { getResponseData, setLike }) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  let method;

  if(isLiked) {
    method = 'DELETE'
  }
  else{
    method = 'PUT'
  }

  setLike(item, method, baseUrl, { getResponseData })
    .then((updatedCard) => {
      likeButton.classList.toggle('card__like-button_is-active', !isLiked);

      if (cardLikes) {
        cardLikes.textContent = updatedCard.likes.length; 
      }
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    });
}
