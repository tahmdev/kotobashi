import type { NextApiRequest, NextApiResponse } from "next";
import w10000 from "../../../../10000.json";
import getWordChain from "../../../../utils/getWordChain";
import isOnlyKanji from "../../../../utils/isOnlyKanji";

interface IWordlist {
  [key: string]: string[];
}

const wordList: IWordlist = {
  easy: get2LengthKanji("easy"),
  medium: get2LengthKanji("medium"),
  hard: get2LengthKanji("hard"),
};

function get2LengthKanji(difficulty: keyof typeof w10000) {
  return w10000[difficulty]
    .map((el) => el.kanji)
    .filter((el) => el.length === 2 && isOnlyKanji(el));
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
    const chain = getWordChain(wordList[difficulty], length);
    res.status(200).json({ chain });
  }
}
