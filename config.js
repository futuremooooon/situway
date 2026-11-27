/* SituWay 배포 설정
   GOOGLE_CLIENT_ID를 넣으면 'Google 계정으로 일정 가져오기'가 켜져요.
   비워 두면 .ics 파일 불러오기로만 일정을 넣을 수 있어요. 설정 방법은 README.md 참고. */
window.SITUWAY_CONFIG = {
  GOOGLE_CLIENT_ID: "725930487824-90skhlv4vhercqqrfgj5q44q4vt7krvg.apps.googleusercontent.com",
  // true로 바꾸면 예전의 독립 승하차 알림 화면에서 역 이름 검색이 열려요(보통은 false)
  LIVE_REAL: false,
  // 실제 위치 승하차 알림 사용 횟수 카운터(Google 계정당 1회, 전체 20회) — 개인 Gmail의 Apps Script
  COUNTER_URL: "https://script.google.com/macros/s/AKfycbyMGYB7iHT9o9KnHtM_EpavFVHvmwG6L0KPgxPK5rR-C90P_7dY9L-pD8EWlGgEqeun/exec",
  ODSAY_KEY: "gHLKIH+xSvdRcjLXW5UFXXKnChJoyQZB1E9sSfqwEPo"
};
