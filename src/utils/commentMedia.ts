import { CommentMedia } from '../types';

export function commentMedia(comment: { media?: CommentMedia[]; photoUrl?: string }): CommentMedia[] {
  const media = (comment.media || []).filter(m => m?.url && ['image', 'video'].includes(m.type));
  if (comment.photoUrl && !media.some(m => m.url === comment.photoUrl)) return [{ id: 'legacy-photo', type: 'image', url: comment.photoUrl }, ...media];
  return media;
}
