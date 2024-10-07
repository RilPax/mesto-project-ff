// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
function createCard(item, { deleteCard }) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = item.name;
  const cardImage = card.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(card);
  });
  return card;
}

const cardAdd = (initialCards) => {
  initialCards.forEach((item) => {
    const cardElement = createCard(item, {
      deleteCard: (card) => {
        card.remove();
      }
    });
    cardContainer.append(cardElement);
  });
};

cardAdd(initialCards);

