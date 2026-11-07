import type { ActivityEntry } from '../types';
export function compactActivity(event: ActivityEntry): ActivityEntry;
export function activityKind(event: ActivityEntry): NonNullable<ActivityEntry['kind']>;
