import {findPhotoObject} from './render-big-picture.js';

const COMMENTS_COUNT = 5; // сколько комментариев за раз показывается под фото

const socialComments = document.querySelector('.social__comments');
const commentsTemplate = socialComments.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const bigPhoto = document.querySelector('.big-picture__img');
const bigPictureSocial = document.querySelector('.big-picture__social');
const socialCommentTotalCount = bigPictureSocial.querySelector('.social__comment-total-count');

const commentsFragment = document.createDocumentFragment();

function findComments () {
  const pictureId = bigPhoto.dataset.pictureId;
  const photoData = findPhotoObject(pictureId);
  return photoData.comments;
}

function renderFirstsComments() {
  socialComments.innerHTML = '';
  const comments = findComments();

  for (let i = 0; i < COMMENTS_COUNT && i < comments.length; i++) {
    createCommentsFragment(i, comments);
  }
  socialComments.appendChild(commentsFragment);
  renderSocialCommentShownCount();
  renderCommentsLoader();
}

function renderMoreComments () {
  const lastIndex = socialComments.children.length;
  const comments = findComments();

  for (let i = lastIndex; i < lastIndex + COMMENTS_COUNT && i < comments.length; i++) {
    createCommentsFragment(i, comments);
  }
  socialComments.appendChild(commentsFragment);
  renderSocialCommentShownCount();
  renderCommentsLoader();
}

function createCommentsFragment (index, comments){
  const commentsElement = commentsTemplate.cloneNode(true);
  commentsElement.querySelector('img').src = comments[index].avatar;
  commentsElement.querySelector('img').alt = comments[index].name;
  commentsElement.querySelector('.social__text').textContent = comments[index].message;
  commentsElement.dataset.commentId = comments[index].id;
  commentsFragment.appendChild(commentsElement);
}

function renderSocialCommentShownCount () {
  const commentsShown = socialComments.children.length;
  bigPictureSocial.querySelector('.social__comment-shown-count').textContent = commentsShown ;

}

function renderCommentsLoader () {
  const commentsTotal = socialCommentTotalCount.textContent;
  const commentsShown = socialComments.children.length;
  commentsLoader.classList.remove('hidden');

  if (commentsShown >= commentsTotal) {
    commentsLoader.classList.add('hidden');
  }
}

export {renderFirstsComments, renderMoreComments};
