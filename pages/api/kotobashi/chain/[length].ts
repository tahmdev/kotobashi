import type { NextApiRequest, NextApiResponse } from "next";
import w10000 from "../../../../10000.json";
import getWordChain from "../../../../utils/getWordChain";
const wordList = w10000
  .map((el) => el.kanji)
  .filter(
    (el) =>
      el.length === 2 && el.match(/^[\u4e00-\u9faf]+$|^[\u3400-\u4dbf]+$/g)
  );
type Data = {
  chain: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const length = Number(req.query.length);
  const chain = getWordChain(wordList, length);

  res.status(200).json({ chain });
}
