const PHOTO_ID_COUNT_MAX = 25; // необходимое кол-во объектов
const PHOTO_PATH = 'photos/'; // адрес папки с фото
const PHOTO_LIKES_MIN = 15; // кол-во лайков
const PHOTO_LIKES_MAX = 200;
const PHOTO_DESCRIPTION_MIN_LENGTH = 20; // длинна случайного описания фото
const PHOTO_DESCRIPTION_MAX_LENGTH = 100;
const COMMENTS_AVATAR_PATH = 'img/'; // адрес папки с аватарками
const AVATAR_COUNTS_MIN = 1; // кол-во аватарок
const AVATAR_COUNTS_MAX = 6;
const COMMENTS_ID_LENGTH = 6; // длинна случайного идентификатора комментария
const COMMENTS_COUNT_MIN = 0; // кол-во комментариев к объекту
const COMMENTS_COUNT_MAX = 30;
const COMMENT_MESSEGES_COUNT_MAX = 2; // кол-во случайных строк из которых собираются комментарии
const COMMENTS_IDS = new Set(); // тут хранятся ID комментариев для проверки их на уникальность
const PHOTO_DATA = []; // сюда записывается результат всех операций

const USER_MESSEGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES = [
  'Мия','Анастасия','Михаил','Артур','Григорий','Софья','Ульяна',
  'Есения','Андрей','Алексей','София','Лев','Полина','Аиша','Иван',
  'Наталья','Фёдор','Никита','Артём','Василиса','Александр','Алина',
  'Екатерина','Степан','Константин','Николай','Ксения','Алёна',
  'Даниил','Кирилл','Максим','Евгений','Тимур','Мария','Вероника',
  'Кристина','Марта','Елизавета','Стефания','Виктория','Диана','Николь',
  'Дарья','Гордей','Ольга','Варвара','Матвей','Элина','Карим','Валерия'
];


function getRandomNumber (from, before) {
  const LOWER = Math.ceil(Math.min(from, before));
  const UPPER = Math.floor(Math.max(from, before));
  const RESULT = Math.random() * (UPPER - LOWER + 1) + LOWER;
  return Math.floor(RESULT);
}
// console.log(getRandomNumber(5, 10));


function getNewID () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}


const getPhotoID = getNewID();
const getPhotoPathID = getNewID();


function getPhotoURL (path) {
  const URL = `${path + getPhotoPathID()}.jpg`;
  return URL;
}


function getRandomString (desiredStringLength = 1) {
  const PRIMER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < desiredStringLength; i++) {
    randomString += PRIMER.charAt(Math.floor(Math.random() * PRIMER.length));
  }
  return randomString;
}
// console.log(getRandomString(5));


function getDescription (){
  return getRandomString(getRandomNumber(PHOTO_DESCRIPTION_MIN_LENGTH, PHOTO_DESCRIPTION_MAX_LENGTH));
}
// console.log(getDescription());


function getRandomUserName () {
  const RANDOM_NAME_INDEX = getRandomNumber(0, USER_NAMES.length - 1);
  return USER_NAMES[RANDOM_NAME_INDEX];
}
// console.log(getRandomUserName());


function getRandomLikesCount () {
  return getRandomNumber(PHOTO_LIKES_MIN, PHOTO_LIKES_MAX);
}
// console.log(getRandomLikesCount());


function getAvatarImgURL () {
  return `${COMMENTS_AVATAR_PATH}avatar-${getRandomNumber(AVATAR_COUNTS_MIN, AVATAR_COUNTS_MAX)}`;
}
// console.log(getAvatarImgURL());


function getID(length) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += getRandomNumber(1,9);
  }
  return id;
}
// console.log(getID(COMMENTS_ID_LENGTH));


function getUniqueCommentID (){
  const id = getID(COMMENTS_ID_LENGTH);
  while (!COMMENTS_IDS.has(id)) {
    COMMENTS_IDS.add(id);
    break;
  }
  return id;
}
// console.log(getUniqueCommentID());
// console.log(COMMENTS_IDS);


function getCommentMessage (count){
  const COUNT_MESEEGES = getRandomNumber(1, count);
  let message = '';
  for (let i = 0; i < COUNT_MESEEGES; i++){
    message += (` ${ USER_MESSEGES[getRandomNumber(0, USER_MESSEGES.length - 1)]}`);
  }
  return message;
}
// console.log(getCommentMessage(COMMENT_MESSEGES_COUNT_MAX));


function getComment (){
  return {
    id: getUniqueCommentID(),
    avatar: getAvatarImgURL(),
    message: getCommentMessage(COMMENT_MESSEGES_COUNT_MAX),
    name: getRandomUserName()
  };
}
// console.log(getComment());


function getCommentsArray (){
  const COUNT_COMMENTS = getRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  // console.log(COUNT_COMMENTS);
  const COMMENTS = [];
  for (let i = 0; i < COUNT_COMMENTS; i++){
    const NEW_COMMENT = getComment();
    COMMENTS.push(NEW_COMMENT);
  }
  return COMMENTS;
}
// console.log(getCommentsArray());


function getOnePhotoData (){
  return {
    id: getPhotoID(),
    url: getPhotoURL(PHOTO_PATH),
    description: getDescription(),
    likes: getRandomLikesCount(),
    comments: getCommentsArray()
  };
}
// console.log(getOnePhotoData());


function getPhotoData (){
  for (let i = 0; i < PHOTO_ID_COUNT_MAX; i++) {
    const NEW_PHOTO_DATA = getOnePhotoData();
    PHOTO_DATA.push(NEW_PHOTO_DATA);
  }
  return PHOTO_DATA;
}
console.table(getPhotoData()); // результат всех операций
