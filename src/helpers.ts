export const modifyPath = (str: string) => {
  const slicedStr = str.slice(1);
  return slicedStr.charAt(0).toUpperCase() + slicedStr.slice(1);
};
