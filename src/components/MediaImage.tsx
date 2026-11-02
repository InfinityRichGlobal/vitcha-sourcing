import { ImgHTMLAttributes } from 'react';
import { normalizeMediaUrl } from '../utils/mediaUrl';

export function MediaImage({ src, alt = 'รูปภาพ', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} src={normalizeMediaUrl(src)} alt={alt} />;
}
