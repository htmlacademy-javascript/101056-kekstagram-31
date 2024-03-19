function isTimeCorrect (startWork, endWork, startMeeting, meetingDuration) {
  startWork = parseInt(startWork.split(':')[0], 10) * 60 + parseInt(startWork.split(':')[1], 10);
  endWork = parseInt(endWork.split(':')[0], 10) * 60 + parseInt(endWork.split(':')[1], 10);
  startMeeting = parseInt(startMeeting.split(':')[0], 10) * 60 + parseInt(startMeeting.split(':')[1], 10);

  if (startMeeting < startWork || (startMeeting + meetingDuration) > endWork) {
    return false;
  }
  return true;
}

// console.log(isTimeCorrect('08:00', '17:30', '16:00', 90));
// console.log(isTimeCorrect('8:0', '10:0', '8:0', 120));
// console.log(isTimeCorrect('08:00', '14:30', '14:00', 90));
// console.log(isTimeCorrect('14:00', '17:30', '08:0', 90));
// console.log(isTimeCorrect('8:00', '17:30', '08:00', 900));

isTimeCorrect();
