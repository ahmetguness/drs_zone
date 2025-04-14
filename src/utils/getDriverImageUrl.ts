export const getDriverImageUrl = (surname: string): string => {
  const lastWord = surname.trim().split(" ").pop()?.toUpperCase();
  return `https://media.formula1.com/content/dam/fom-website/drivers/2025Drivers/${lastWord}.jpg.transform/2col/image.jpg`;
};
