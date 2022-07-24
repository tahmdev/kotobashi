import type { NextApiRequest, NextApiResponse } from "next";
import getDaysSinceStart from "../../../../utils/getDaysSinceStart";
import daily from "./daily.json";
type Data = {
  chain: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { difficulty } = req.query;
  const i = getDaysSinceStart();
  type Keys = keyof typeof daily;
  res.status(200).json({ chain: daily[difficulty as Keys][i] });
}
