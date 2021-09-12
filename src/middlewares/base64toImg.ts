const base64toImg = (base64: string) => {
  return Buffer.from(base64, 'base64');
};

export default base64toImg;
