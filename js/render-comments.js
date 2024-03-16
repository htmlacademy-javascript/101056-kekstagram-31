const socialComments = document.querySelector('.social__comments');
const commentsTemplate = socialComments.querySelector('.social__comment');

function renderComments(comments) {
  const commentsFragment = document.createDocumentFragment();
  socialComments.innerHTML = '';

  comments.forEach((element) => {
    const commentsElement = commentsTemplate.cloneNode(true);
    commentsElement.querySelector('img').src = element.avatar;
    commentsElement.querySelector('img').alt = element.name;
    commentsElement.querySelector('.social__text').textContent = element.message;
    commentsElement.dataset.commentId = element.id;
    commentsFragment.appendChild(commentsElement);
  });

  socialComments.appendChild(commentsFragment);
}

export {renderComments};
