// import {getRandomNumber, getRandomString, getUniqueID} from './util.js';

// const PHOTO_ID_FROM = 1; // идентификаторы фото от/до
// const PHOTO_ID_TO = 26;
// const PHOTO_PATH = 'photos/'; // адрес папки с фото
// const PHOTO_LIKES_MIN = 15; // кол-во лайков
// const PHOTO_LIKES_MAX = 200;
// const PHOTO_DESCRIPTION_MIN_LENGTH = 20; // длинна случайного описания фото
// const PHOTO_DESCRIPTION_MAX_LENGTH = 100;
// const COMMENTS_AVATAR_PATH = 'img/'; // адрес папки с аватарками
// const AVATAR_COUNTS_MIN = 1; // кол-во аватарок
// const AVATAR_COUNTS_MAX = 6;
// const COMMENTS_COUNT_MIN = 0; // кол-во комментариев к объекту
// const COMMENTS_COUNT_MAX = 30;
// const COMMENT_MESSEGES_COUNT_MAX = 2; // кол-во случайных строк из которых собираются комментарии
// const COMMENTS_ID_FROM = PHOTO_ID_FROM * COMMENTS_COUNT_MIN; // идентификаторы комментариев от/до
// const COMMENTS_ID_TO = PHOTO_ID_TO * COMMENTS_COUNT_MAX;


// const USER_MESSEGES = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
//   'В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают.',
//   'Как можно было поймать такой неудачный момент?!'
// ];

// const USER_NAMES = [
//   'Мия','Анастасия','Михаил','Артур','Григорий','Софья','Ульяна',
//   'Есения','Андрей','Алексей','София','Лев','Полина','Аиша','Иван',
//   'Наталья','Фёдор','Никита','Артём','Василиса','Александр','Алина',
//   'Екатерина','Степан','Константин','Николай','Ксения','Алёна',
//   'Даниил','Кирилл','Максим','Евгений','Тимур','Мария','Вероника',
//   'Кристина','Марта','Елизавета','Стефания','Виктория','Диана','Николь',
//   'Дарья','Гордей','Ольга','Варвара','Матвей','Элина','Карим','Валерия'
// ];


// const getUniquePhotoID = getUniqueID(PHOTO_ID_FROM, PHOTO_ID_TO);
// const getUniqueCommentID = getUniqueID(COMMENTS_ID_FROM, COMMENTS_ID_TO);


// function getCommentMessage (count){
//   let message = '';
//   for (let i = 0; i < getRandomNumber(1, count); i++){
//     message += (` ${ USER_MESSEGES[getRandomNumber(0, USER_MESSEGES.length - 1)]}`);
//   }
//   return message.trim();
// }


// function getCommentObject (){
//   return {
//     id: getUniqueCommentID(),
//     avatar: `${COMMENTS_AVATAR_PATH}avatar-${getRandomNumber(AVATAR_COUNTS_MIN, AVATAR_COUNTS_MAX)}.svg`,
//     message: getCommentMessage(COMMENT_MESSEGES_COUNT_MAX),
//     name: USER_NAMES[getRandomNumber(0, USER_NAMES.length - 1)]
//   };
// }


// function getCommentsData (){
//   const commentsData = [];
//   for (let i = 0; i < getRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX); i++){
//     commentsData.push(getCommentObject());
//   }
//   return commentsData;
// }


// function getPhotoObject (){
//   const photoID = getUniquePhotoID();
//   return {
//     id: photoID,
//     url: `${PHOTO_PATH + photoID}.jpg`,
//     description: getRandomString(getRandomNumber(PHOTO_DESCRIPTION_MIN_LENGTH, PHOTO_DESCRIPTION_MAX_LENGTH)),
//     likes: getRandomNumber(PHOTO_LIKES_MIN, PHOTO_LIKES_MAX),
//     comments: getCommentsData()
//   };
// }


// function getPhotoData (){
//   const photoData = [];
//   for (let i = 0; i < PHOTO_ID_TO; i++) {
//     photoData.push(getPhotoObject());
//   }
//   return photoData;
// }

// export {getPhotoData};
