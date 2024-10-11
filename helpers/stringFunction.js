export const firstLetterToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const firstWordsToUpperCase = (string = '') => {
  const arrStr = string.split(' ');
  const result = arrStr.map(word => {
    return firstLetterToUpperCase(word)
  }).join('');

  return result;
}