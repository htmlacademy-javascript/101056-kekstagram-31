const COMMENTS_COUNT = 5; // сколько комментариев за раз показывается под фото
let comments = [];

const bigPictureSocial = document.querySelector('.big-picture__social');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const commentsTemplate = socialComments.querySelector('.social__comment');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');
const socialCommentTotalCount = bigPictureSocial.querySelector('.social__comment-total-count');

const commentsFragment = document.createDocumentFragment();


function renderFirstsComments(commentsArray) {
  socialComments.innerHTML = '';
  comments = commentsArray;

  for (let i = 0; i < COMMENTS_COUNT && i < comments.length; i++) {
    createCommentsFragment(i);
  }
  socialComments.appendChild(commentsFragment);
  renderSocialCommentShownCount();
  renderCommentsLoader();
}

function renderMoreComments () {
  const lastIndex = socialComments.children.length;

  for (let i = lastIndex; i < lastIndex + COMMENTS_COUNT && i < comments.length; i++) {
    createCommentsFragment(i);
  }
  socialComments.appendChild(commentsFragment);
  renderSocialCommentShownCount();
  renderCommentsLoader();
}

function createCommentsFragment (index){
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
