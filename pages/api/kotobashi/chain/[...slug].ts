import type { NextApiRequest, NextApiResponse } from "next";
import w10000 from "../../../../10000.json";
import getWordChain from "../../../../utils/getWordChain";

interface IWordlist {
  easy: string[];
  medium: string[];
  hard: string[];
}
const wordList: IWordlist = {
  easy: [],
  medium: [],
  hard: [],
};

for (let i = 0; i < w10000.length; i++) {
  const { kanji } = w10000[i];
  if (kanji.length === 2 && isOnlyKanji(kanji)) {
    if (i < 3000) wordList.easy.push(kanji);
    if (i < 6000) wordList.medium.push(kanji);
    wordList.hard.push(kanji);
  }
}

function isOnlyKanji(string: string) {
  return string.match(/^[\u4e00-\u9faf]+$|^[\u3400-\u4dbf]+$/g);
}

type Data = {
  chain: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.slug?.length === 2) {
    const difficulty = req.query.slug[0];
    const length = Number(req.query.slug[1]);
    let chain: string[] = [];
    switch (difficulty) {
      case "easy":
        chain = getWordChain(wordList.easy, length);
        break;
      case "medium":
        chain = getWordChain(wordList.medium, length);
        break;
      case "hard":
        chain = getWordChain(wordList.hard, length);
        break;
      default:
        chain = getWordChain(wordList.hard, length);
        break;
    }
    res.status(200).json({ chain });
  }
}
