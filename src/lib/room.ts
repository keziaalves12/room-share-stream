const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const KEY = "gs-room-code";

export function generateRoomCode() {
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `GS-${out}`;
}

export function saveRoomCode(code: string) {
  try {
    sessionStorage.setItem(KEY, code);
  } catch {
    /* ignore */
  }
}

export function readRoomCode() {
  try {
    return sessionStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}
