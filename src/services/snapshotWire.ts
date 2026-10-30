export function unpackSnapshot(data: any): any {
  if (data?.wireFormat !== 'images-v1') return data;
  if (!Array.isArray(data.images) || !data.snapshot) throw new Error('ข้อมูลเซิร์ฟเวอร์ไม่สมบูรณ์');
  const visit = (value: any): any => {
    if (Array.isArray(value)) return value.map(visit);
    if (value && typeof value === 'object') {
      if (Object.keys(value).length === 1 && Object.prototype.hasOwnProperty.call(value, '$vitchaImage')) {
        const index = value.$vitchaImage;
        if (!Number.isInteger(index) || typeof data.images[index] !== 'string' || !data.images[index].startsWith('data:image/')) throw new Error('ข้อมูลรูปภาพไม่สมบูรณ์');
        return data.images[index];
      }
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, visit(item)]));
    }
    return value;
  };
  return visit(data.snapshot);
}
