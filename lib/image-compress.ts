'use client';

const MAX_BYTES = 500 * 1024;

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Image compression failed'));
    }, 'image/jpeg', quality);
  });
}

export async function compressImageTo500KB(file: File) {
  if (file.size <= MAX_BYTES && file.type !== 'image/png') return file;

  const image = await createImageBitmap(file);
  let width = image.width;
  let height = image.height;
  let quality = 0.82;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(320, Math.round(width));
    canvas.height = Math.max(320, Math.round(height));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is not available');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await canvasToBlob(canvas, quality);
    if (blob.size <= MAX_BYTES || (canvas.width <= 640 && quality <= 0.48)) {
      return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
    }

    if (quality > 0.52) {
      quality -= 0.1;
    } else {
      width *= 0.82;
      height *= 0.82;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = Math.max(320, Math.round((image.height / image.width) * 640));
  canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
  const blob = await canvasToBlob(canvas, 0.45);
  return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
}
