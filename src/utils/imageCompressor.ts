/**
 * Compress & resize image files using HTML5 Canvas so photos & avatars
 * stay fast, crisp, and well within browser localStorage limits.
 */
export async function compressImageFile(
  file: File,
  maxDimension = 960,
  quality = 0.72
): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        resolve('');
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
               height = Math.round((height * maxDimension) / width);
               width = maxDimension;
            } else {
               width = Math.round((width * maxDimension) / height);
               height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(dataUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch {
          resolve(dataUrl);
        }
      };
      img.onerror = () => {
        resolve(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

/**
 * Safe localStorage setter that never throws an uncaught QuotaExceededError
 * and automatically cleans up obsolete keys if storage is tight.
 */
export function safeSetLocalStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    try {
      // Remove legacy version keys first
      const legacyPrefixes = [
        'vitcha_suppliers_v1',
        'vitcha_suppliers_v2',
        'vitcha_suppliers_v3',
        'vitcha_suppliers_v4',
        'vitcha_drink_stores_v1',
        'vitcha_drink_stores_v2',
        'vitcha_drink_stores_v3',
        'vitcha_drink_stores_v4',
        'vitcha_users_v1',
        'vitcha_users_v2',
        'vitcha_users_v3',
        'vitcha_users_v4',
        'vitcha_notifications_v1',
        'vitcha_notifications_v2',
        'vitcha_notifications_v3',
        'vitcha_notifications_v4',
      ];
      legacyPrefixes.forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(key, value);
    } catch {
      // Ignore if still full so React UI never freezes or crashes
    }
  }
}
