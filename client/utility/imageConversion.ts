import html2canvas from 'html2canvas';

const convertCanvasToImageUrl = async (element: any) => {
  const canvas = await html2canvas(element);
  const imageUrl = canvas.toDataURL('image/jpeg');
  return imageUrl;
};

export default convertCanvasToImageUrl;
