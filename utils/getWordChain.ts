function getWordChain(words: string[], length: number) {
  let result: string[] = [];
  while (result.length < length && words.length) {
    if (!result.length) {
      result = [words[randomIndex(words)]];
    }

    const chainableWords = getChainableWords(result[result.length - 1], words);

    if (chainableWords.length) {
      const i = randomIndex(chainableWords);
      result = [...result, chainableWords[i]];
      words = words.filter((el) => el !== chainableWords[i]);
    } else {
      result.pop();
    }
  }
  return result;
}

function randomIndex(arr: any[]) {
  return Math.floor(Math.random() * arr.length);
}

function getChainableWords(start: string, wordList: string[]) {
  return wordList.filter((el) => el.startsWith(start.slice(-1)));
}

export default getWordChain;
