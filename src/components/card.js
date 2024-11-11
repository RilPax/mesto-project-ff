export function createCard(item, { deleteCard, handleLike, handleImageClick }) {
  const card = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = item.name;
  const cardImage = card.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(card);
  });

  const likeBtn = card.querySelector('.card__like-button');
  likeBtn.addEventListener('click', (evt) => {
    handleLike(evt);
  });

  cardImage.addEventListener('click', () => {
    handleImageClick(item.link, item.name);
  });

  return card;
}