const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export async function uploadToImgBB(file: File): Promise<string> {
  if (!IMGBB_API_KEY) throw new Error('ImgBB API key is missing');
  const formData = new FormData();
  formData.append('image', file);
  formData.append('key', IMGBB_API_KEY);
  const response = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: formData });
  if (!response.ok) throw new Error('ImgBB upload failed');
  const data = await response.json();
  return data.data.url as string;
}

export async function uploadBase64ToImgBB(base64: string): Promise<string> {
  if (!IMGBB_API_KEY) throw new Error('ImgBB API key is missing');
  const formData = new FormData();
  formData.append('image', base64.replace(/^data:image\/\w+;base64,/, ''));
  formData.append('key', IMGBB_API_KEY);
  const response = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: formData });
  if (!response.ok) throw new Error('ImgBB upload failed');
  const data = await response.json();
  return data.data.url as string;
}
