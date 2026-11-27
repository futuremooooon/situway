/* SituWay 실시간 승하차 알림 사용 횟수 카운터
   - Google 계정당 1회, 전체 LIMIT회까지
   - 앱이 보낸 Google 액세스 토큰으로 이메일을 확인해서 계정을 구분해요 (이메일은 이 스크립트 속성에만 저장) */
const LIMIT = 20;

function doPost(e) {
  let body = {};
  try { body = JSON.parse(e.postData.contents || "{}"); } catch (err) {}
  return handle_(body);
}

function doGet() {
  return handle_({ action: "status" });
}

function handle_(p) {
  const props = PropertiesService.getScriptProperties();
  const total = () => Number(props.getProperty("total") || 0);
  const out = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
  if (p.action === "status") return out({ ok: true, total: total(), limit: LIMIT, left: Math.max(0, LIMIT - total()) });
  if (p.action !== "claim" && p.action !== "refund") return out({ ok: false, reason: "action" });
  const email = emailOf_(p.token);
  if (!email) return out({ ok: false, reason: "auth" });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const key = "u:" + email.toLowerCase();
    if (p.action === "refund") {
      if (props.getProperty(key)) { props.deleteProperty(key); props.setProperty("total", String(Math.max(0, total() - 1))); }
      return out({ ok: true, left: Math.max(0, LIMIT - total()) });
    }
    if (props.getProperty(key)) return out({ ok: false, reason: "used", left: Math.max(0, LIMIT - total()) });
    if (total() >= LIMIT) return out({ ok: false, reason: "full", left: 0 });
    props.setProperty(key, new Date().toISOString());
    props.setProperty("total", String(total() + 1));
    return out({ ok: true, left: Math.max(0, LIMIT - total()) });
  } finally {
    lock.releaseLock();
  }
}

function emailOf_(token) {
  if (!token) return null;
  try {
    const r = UrlFetchApp.fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: "Bearer " + token }, muteHttpExceptions: true });
    if (r.getResponseCode() !== 200) return null;
    const j = JSON.parse(r.getContentText());
    return j.email && j.email_verified !== false ? j.email : null;
  } catch (err) {
    return null;
  }
}
