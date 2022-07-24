function isOnlyKanji(string: string) {
  return string.match(/^[\u4e00-\u9faf]+$|^[\u3400-\u4dbf]+$/g);
}

export default isOnlyKanji;
