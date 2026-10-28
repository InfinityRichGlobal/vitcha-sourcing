import type { ImgHTMLAttributes } from 'react';

/** Keep profile rows intact when an optional or remote avatar is unavailable. */
export function AvatarImage({ src, alt = '', onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} src={src || './logo.jpg'} alt={alt} onError={event => {
    if (!event.currentTarget.src.endsWith('/logo.jpg')) event.currentTarget.src = './logo.jpg';
    onError?.(event);
  }} />;
}
