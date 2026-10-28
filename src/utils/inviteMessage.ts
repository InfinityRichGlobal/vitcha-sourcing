export function inviteMessage(
  invite: { code: string; prefilledAlias?: string },
  location: string,
) {
  const url = new URL(location);
  url.search = "";
  url.hash = "";
  url.searchParams.set("invite", invite.code);
  return `สวัสดี${invite.prefilledAlias?.trim() ? ` ${invite.prefilledAlias.trim()}` : "ครับ"}\n\nขอเชิญเข้าร่วมทีม VITCHA\nเปิดลิงก์ด้านล่างเพื่อสมัครสมาชิกได้เลยครับ\n\n${url.toString()}\n\nลิงก์นี้ใช้สมัครได้ 1 บัญชี`;
}
