import React from "react";

interface Stat {
  totalGuesses: number;
  totalSolved: number;
}
interface Props {
  difficulty: string;
  stats: {
    easy: Stat;
    medium: Stat;
    hard: Stat;
  };
  free: boolean;
  guesses: string[];
}
export const KBStats: React.FC<Props> = ({
  stats,
  difficulty,
  free,
  guesses,
}) => {
  const { totalGuesses, totalSolved } = stats[difficulty as keyof typeof stats];
  if (free) {
    return (
      <div>
        <p> Congratulations! </p>
        <p>
          {`You have solved the ${difficulty} puzzle in ${guesses.length} guesses.`}
        </p>
        <p>{`Free play stats are not being tracked`}</p>
      </div>
    );
  }
  return (
    <div>
      <p> Congratulations! </p>
      <p>{`You have solved a total of ${totalSolved} daily ${difficulty}  ${
        totalSolved === 1 ? "puzzle" : "puzzles"
      }.`}</p>
      <p>
        {`It takes you an average of ${
          Math.round((totalGuesses / totalSolved) * 10) / 10
        } guesses to solve
        ${difficulty} puzzles.`}
      </p>
    </div>
  );
};
