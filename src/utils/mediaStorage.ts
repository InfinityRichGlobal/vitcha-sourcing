/**
 * Media Storage Helper for Video & Multimedia uploads
 * Handles reading video files as base64 data URIs or object URLs safely.
 */

export async function readVideoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // 25MB safety threshold for browser performance
    const maxSizeBytes = 25 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      reject(new Error(`ขนาดไฟล์วิดีโอใหญ่เกินไป (${(file.size / (1024 * 1024)).toFixed(1)} MB) กรุณาเลือกคลิปสั้นไม่เกิน 25 MB`));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        resolve(result);
      } else {
        reject(new Error('ไม่สามารถอ่านไฟล์วิดีโอนี้ได้'));
      }
    };
    reader.onerror = () => reject(new Error('เกิดข้อผิดพลาดในการโหลดไฟล์วิดีโอ'));
    reader.readAsDataURL(file);
  });
}

export function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return (
    url.startsWith('data:video/') ||
    url.endsWith('.mp4') ||
    url.endsWith('.mov') ||
    url.endsWith('.webm') ||
    url.includes('gtv-videos-bucket')
  );
}
