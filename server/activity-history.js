import { randomUUID } from 'node:crypto';

// Capture only the server's allowed work fields, never request-provided audit data.
export function recordActivity(item, actor, { kind, action, before = {}, fields = [], id = randomUUID(), content, timestamp = new Date().toISOString() }) {
  const changes = fields.flatMap(field => {
    const previous = before[field] ?? null;
    const next = item[field] ?? null;
    return JSON.stringify(previous) === JSON.stringify(next) ? [] : [{ field, before: structuredClone(previous), after: structuredClone(next) }];
  });
  if (['update', 'handoff'].includes(kind) && !changes.length) return;
  const event = {
    id, version: 2, kind, action, userId: actor.id, user: actor.alias || actor.name,
    userAvatar: actor.avatar, timestamp,
    stageBefore: kind === 'create' ? null : before.handoffStage || 'awaiting',
    stageAfter: item.handoffStage || 'awaiting', changes,
    ...(content ? { content: structuredClone(content) } : {}),
  };
  (item.history ||= []).push(event);
  return event;
}
