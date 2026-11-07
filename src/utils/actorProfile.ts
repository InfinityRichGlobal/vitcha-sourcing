import type { User } from '../types';

/** Resolve current profiles without copying their image into each activity. */
export function resolveActorProfile(users: User[], id: string | undefined, name: string, avatar = '') {
  const user = id ? users.find(user => user.id === id) : users.find(user => user.alias === name || user.name === name);
  return { name: user?.alias || name, avatar: user?.avatar || avatar };
}
