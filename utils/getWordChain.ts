function getWordChain(words: string[], length: number, start?: number) {
  if (!start) start = randomIndex(words);
  let result = [words[start]];
  while (result.length < length && words.length) {
    if (!result.length) {
      result = [words[randomIndex(words)]];
    }

    const chainableWords = words.filter((el) =>
      el.startsWith(result[result.length - 1].slice(-1))
    );

    if (chainableWords.length) {
      const i = randomIndex(chainableWords);
      result = [...result, chainableWords[i]];
      words = words.filter((el) => el !== chainableWords[i]);
    } else {
      const removed = result.pop();
      words = words.filter((el) => el !== removed);
    }
  }
  return result;
}
export default getWordChain;

function randomIndex(arr: any[]) {
  return Math.floor(Math.random() * arr.length);
}
