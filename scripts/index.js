// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardContainer = document.querySelector('.places__list');
const cardAdd = (initialCards) => {
  for(let i = 0; i < initialCards.length; i++) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = initialCards[i].name;
    card.querySelector('.card__image').src = initialCards[i].link;
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
      card.remove();
    });
    cardContainer.append(card);
  }
}
cardAdd(initialCards);