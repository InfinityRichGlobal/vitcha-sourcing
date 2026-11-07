import { randomUUID } from 'node:crypto';
import { activityMediaCounts, compactActivity } from '../src/utils/activitySummary.js';

// Capture only the server's allowed work fields, never request-provided audit data.
export function recordActivity(item, actor, { kind, action, before = {}, fields = [], id = randomUUID(), content, timestamp = new Date().toISOString() }) {
  if (['update', 'handoff'].includes(kind) && !fields.some(field => JSON.stringify(before[field] ?? null) !== JSON.stringify(item[field] ?? null))) return;
  const mediaCounts = ['create', 'update'].includes(kind) ? activityMediaCounts(before, item)
    : ['comment', 'reply'].includes(kind) ? activityMediaCounts({}, content) : {};
  const event = compactActivity({ id, kind, action, userId: actor.id, user: actor.alias || actor.name, timestamp, mediaCounts });
  (item.history ||= []).push(event);
  return event;
}
