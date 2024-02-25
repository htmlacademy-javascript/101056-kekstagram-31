const PHOTO_ID_FROM = 1; // идентификаторы фото от/до
const PHOTO_ID_TO = 25;
const PHOTO_PATH = 'photos/'; // адрес папки с фото
const PHOTO_LIKES_MIN = 15; // кол-во лайков
const PHOTO_LIKES_MAX = 200;
const PHOTO_DESCRIPTION_MIN_LENGTH = 20; // длинна случайного описания фото
const PHOTO_DESCRIPTION_MAX_LENGTH = 100;
const COMMENTS_AVATAR_PATH = 'img/'; // адрес папки с аватарками
const AVATAR_COUNTS_MIN = 1; // кол-во аватарок
const AVATAR_COUNTS_MAX = 6;
const COMMENTS_COUNT_MIN = 0; // кол-во комментариев к объекту
const COMMENTS_COUNT_MAX = 30;
const COMMENT_MESSEGES_COUNT_MAX = 2; // кол-во случайных строк из которых собираются комментарии
const COMMENTS_ID_FROM = PHOTO_ID_FROM * COMMENTS_COUNT_MIN; // идентификаторы комментариев от/до
const COMMENTS_ID_TO = PHOTO_ID_TO * COMMENTS_COUNT_MAX;
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


function getRandomNumber (from, to) {
  const LOWER = Math.ceil(Math.min(from, to));
  const UPPER = Math.floor(Math.max(from, to));
  const RESULT = Math.random() * (UPPER - LOWER + 1) + LOWER;
  return Math.floor(RESULT);
}


function getRandomString (desiredStringLength = 1) {
  const PRIMER = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < desiredStringLength; i++) {
    randomString += PRIMER.charAt(Math.floor(Math.random() * PRIMER.length));
  }
  return randomString;
}


function getUniqueID(from, to) {
  let id = from;
  const IDS = new Set();
  return function (){
    while (IDS.has(id)) {
      id = getRandomNumber(from, to);
    }
    IDS.add(id);
    return id;
  };
}
const getUniquePhotoID = getUniqueID(PHOTO_ID_FROM, PHOTO_ID_TO);
const getUniqueCommentID = getUniqueID(COMMENTS_ID_FROM, COMMENTS_ID_TO);


function getCommentMessage (count){
  const COUNT_MESEEGES = getRandomNumber(1, count);
  let message = '';
  for (let i = 0; i < COUNT_MESEEGES; i++){
    message += (` ${ USER_MESSEGES[getRandomNumber(0, USER_MESSEGES.length - 1)]}`);
  }
  return message;
}


function getComment (){
  return {
    id: getUniqueCommentID(),
    avatar: `${COMMENTS_AVATAR_PATH}avatar-${getRandomNumber(AVATAR_COUNTS_MIN, AVATAR_COUNTS_MAX)}.svg`,
    message: getCommentMessage(COMMENT_MESSEGES_COUNT_MAX),
    name: USER_NAMES[getRandomNumber(0, USER_NAMES.length - 1)]
  };
}


function getCommentsArray (){
  const COUNT_COMMENTS = getRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  const COMMENTS = [];
  for (let i = 0; i < COUNT_COMMENTS; i++){
    const NEW_COMMENT = getComment();
    COMMENTS.push(NEW_COMMENT);
  }
  return COMMENTS;
}


function getOnePhotoData (){
  const PHOTO_ID = getUniquePhotoID();
  return {
    id: PHOTO_ID,
    url: `${PHOTO_PATH + PHOTO_ID}.jpg`,
    description: getRandomString(getRandomNumber(PHOTO_DESCRIPTION_MIN_LENGTH, PHOTO_DESCRIPTION_MAX_LENGTH)),
    likes: getRandomNumber(PHOTO_LIKES_MIN, PHOTO_LIKES_MAX),
    comments: getCommentsArray()
  };
}


function getPhotoData (){
  for (let i = 0; i < PHOTO_ID_TO; i++) {
    const NEW_PHOTO_DATA = getOnePhotoData();
    PHOTO_DATA.push(NEW_PHOTO_DATA);
  }
  return PHOTO_DATA;
}
console.table(getPhotoData()); // результат всех операций
