import { ImgHTMLAttributes } from 'react';
import { imageDisplayUrl, ImageSize } from '../utils/mediaUrl';

export function MediaImage({ src, alt = 'รูปภาพ', imageSize = 600, ...props }: ImgHTMLAttributes<HTMLImageElement> & { imageSize?: ImageSize }) {
  return <img decoding="async" {...props} src={imageDisplayUrl(src, imageSize)} alt={alt} />;
}
