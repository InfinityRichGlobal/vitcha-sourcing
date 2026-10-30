import {
  USER_ICE,
  USER_SOMO,
  USER_OHM,
  USER_TUI,
  USER_MAY,
  USER_ZEEN,
  USER_MILD,
  USER_NAME_PKG,
  USER_AYAI,
  USER_LEK,
  USER_BEAM,
  USER_ANN,
  USER_MOOK,
} from './users.mjs';

export const DEMO_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
export const DEMO_VOICE = './audio/sample-feedback-1.m4a';

export const makeLikes = (...users) => {
  const list = users.length > 0 ? users : [USER_ICE, USER_SOMO, USER_OHM];
  return list.map((u, i) => ({
    userId: u.id,
    alias: u.alias,
    avatar: u.avatar,
    timestamp: new Date(Date.parse('2026-10-28T10:00:00Z') + i * 3600000).toISOString(),
  }));
};

export const makeViewedBy = (...views) => {
  const defaultViews = [
    { u: USER_ICE, count: 18, date: '2026-10-29T14:20:00Z' },
    { u: USER_SOMO, count: 14, date: '2026-10-29T14:45:00Z' },
    { u: USER_OHM, count: 9, date: '2026-10-29T15:10:00Z' },
    { u: USER_TUI, count: 8, date: '2026-10-29T15:30:00Z' },
  ];
  const list = views.length > 0 ? views : defaultViews;
  return list.map(v => ({
    userId: v.u.id,
    name: v.u.name,
    alias: v.u.alias,
    avatar: v.u.avatar,
    role: v.u.role,
    lastViewedAt: v.date || '2026-10-29T16:00:00Z',
    viewCount: v.count || 5,
  }));
};

export const makeHistory = (creator, actionName = 'สร้างรายการเริ่มต้นจากการสำรวจหน้างาน') => [
  {
    action: actionName,
    user: creator.alias,
    userAvatar: creator.avatar,
    timestamp: creator.timestamp || '2026-10-27T10:00:00Z',
  },
  {
    action: 'อัปเดตไฟล์สเปกและบันทึกข้อคิดเห็นการส่งมอบงาน',
    user: 'Lek',
    userAvatar: USER_LEK.avatar,
    timestamp: '2026-10-28T11:30:00Z',
  },
];
