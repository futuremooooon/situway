/* SituWay 배포 설정
   GOOGLE_CLIENT_ID를 넣으면 'Google 계정으로 일정 가져오기'가 켜져요.
   비워 두면 .ics 파일 불러오기로만 일정을 넣을 수 있어요. 설정 방법은 README.md 참고. */
window.SITUWAY_CONFIG = {
  GOOGLE_CLIENT_ID: "725930487824-90skhlv4vhercqqrfgj5q44q4vt7krvg.apps.googleusercontent.com",
  // true로 바꾸면 실시간 승하차 알림에서 실제 경로 검색(ODsay, 하루 30회 한도)이 열려요
  LIVE_REAL: false,
  ODSAY_KEY: "gHLKIH+xSvdRcjLXW5UFXXKnChJoyQZB1E9sSfqwEPo"
};
