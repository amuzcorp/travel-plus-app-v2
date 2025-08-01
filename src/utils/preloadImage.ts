const preloadImage = async (url: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);

    image.src = url;
  });
};

export default preloadImage;
