export const getCircuitMap = (circuitName: string): string => {
  const formattedName = circuitName.replace(/ /g, "_");
  return `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${formattedName}`;
};
