/**
 * Compress & resize image files using HTML5 Canvas so photos & avatars
 * are resized before sending the record directly to the server.
 */
export async function compressImageFile(file: File, maxDimension = 960, quality = 0.72): Promise<string> {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') throw new Error('เลือกรูป JPG, PNG หรือ WebP');
  if (file.size > 25 * 1024 * 1024) throw new Error('รูปภาพต้องไม่เกิน 25 MB');
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    const finish = () => { clearTimeout(timeout); URL.revokeObjectURL(url); img.onload = null; img.onerror = null; };
    const timeout = setTimeout(() => { finish(); reject(new Error('รูปภาพใช้เวลาประมวลผลนานเกินไป กรุณาลองรูปอื่น')); }, 30000);
    img.onload = () => {
      try {
        if (!img.width || !img.height) throw new Error('รูปภาพไม่ถูกต้อง');
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('เบราว์เซอร์ไม่สามารถประมวลผลรูปได้');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const result = canvas.toDataURL('image/jpeg', quality);
        if (!result.startsWith('data:image/jpeg')) throw new Error('บีบอัดรูปไม่สำเร็จ');
        finish(); resolve(result);
      } catch (error) { finish(); reject(error); }
    };
    img.onerror = () => { finish(); reject(new Error('อ่านรูปนี้ไม่ได้ กรุณาแปลงเป็น JPG หรือ PNG แล้วลองอีกครั้ง')); };
    img.src = url;
  });
}
