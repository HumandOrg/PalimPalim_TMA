import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/components/Provider";
import { tableMap } from "@/types/types";
import { supabase } from "@/utils/supabase";
import { useBackButton } from "@tma.js/sdk-react";
import Card from "@/components/Card";
import GridDot from "@/components/ui/gridDot";
import { PiDotsNineBold } from "react-icons/pi";
const question = [
  {
    title: "DO YOU RECHARGE BY BEING ALONE OR INTERACTING WITH OTHERS?",
    value: ["Introversion", "Extraversion"],
  },
  {
    title: "IS YOUR WORLDVIEW GROUNDED IN REALITY OR SHAPED BY WHAT COULD BE?",
    value: ["Sensing", "Intuition"],
  },
  {
    title:
      "IN DECISIONS, DO YOU PRIORITIZE OBJECTIVE LOGIC OR EMPATHETIC CONSIDERATIONS?",
    value: ["Thinking", "Feeling"],
  },
  {
    title:
      "DO YOU PREFER LIFE TO BE PLANNED OUT OR DO YOU REVEL IN SPONTANEITY?",
    value: ["Judging", "Perceiving"],
  },
  {
    title: "ARE YOU SHAPED BY YOUR INNATE NATURE OR YOUR ENVIRONMENT?",
    value: ["Nature", "Nurture"],
  },
  {
    title: "DO YOU FIND COMFORT IN STABILITY OR EMBRACE CHANGE?",
    value: ["Stability", "Change"],
  },
  {
    title:
      "ARE YOU MORE PESSIMISTIC OR OPTIMISTIC ABOUT LIFE AND ITS POSSIBILITIES?",
    value: ["Pessimism", "Optimism"],
  },
  {
    title: "DO PAST EXPERIENCES OR FUTURE CONSIDERATIONS GUIDE YOUR DECISIONS?",
    value: ["Past", "Future"],
  },
];
export default function Test() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(new Array(8).fill(0.5));
  const [loading, setLoading] = useState(false);
  const { userTG, userData, goPage } = useContext(Context);
  const backButton = useBackButton();
  const onBackButtonClick = () => {
    goPage("/");
  };
  const { reFetchUserData } = useContext(Context);
  const updateUserScore = async (score: any, userID: number) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(tableMap.users)
        .update({ score: score })
        .eq("user_id", userID);
      if (error) throw error;
      reFetchUserData();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newScore = [...score];
    newScore[index] = parseFloat(event.target.value);
    setScore(newScore);
  };
  const handleSubmit = async () => {
    await updateUserScore(score, userTG?.id as number);
    goPage("/art");
  };
  useEffect(() => {
    backButton.show();
    backButton.on("click", onBackButtonClick);
    return () => {
      backButton.off("click", onBackButtonClick);
      backButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-1 p-1 h-[100dvh]">
      <Card className="h-full flex flex-col items-start justify-start p-12 gap-4">
        <GridDot count={questionIndex + 1} />
        <a className="flex-1">{question[questionIndex].title}</a>
        <a className="opacity-60 text-xs tracking-[1.92px]">{`${
          questionIndex + 1
        }/${question.length}`}</a>
      </Card>
      <div className="flex flex-col gap-[10px] w-full p-12 bg-[#333]">
        <input
          type="range"
          min="0"
          max="1"
          step="0.0001"
          //   value={
          //     userData.score !== null ? userData.score[index] : score[index]
          //   }
          defaultValue={
            userData.score !== null
              ? userData.score[questionIndex]
              : score[questionIndex]
          }
          value={score[questionIndex]}
          className={`appearance-none relative rounded-lg bg-transparent h-12`}
          onChange={(e) => handleChange(e, questionIndex)}
        />
        <div className="flex w-full justify-between">
          <a className="text-xs tracking-[1.92px] opacity-60 text-white">
            {question[questionIndex].value[0]}
          </a>
          <a className="text-xs tracking-[1.92px] opacity-60 text-white">
            {question[questionIndex].value[1]}
          </a>
        </div>
      </div>
      <div className="w-full h-[62px]">
        <button
          className="text-[20px] flex items-center justify-center leading-[150%] border w-full h-full rounded-md hover:border-white/20 bg-white hover:bg-white/80 text-blackBg tracking-[3.2px]"
          onClick={
            questionIndex === question.length - 1
              ? () => handleSubmit()
              : () => setQuestionIndex((prev: number) => prev + 1)
          }
        >
          {loading ? (
            <div className="loader" />
          ) : questionIndex === question.length - 1 ? (
            "GENERATE MY SYNTAX"
          ) : (
            "NEXT"
          )}
        </button>
      </div>
    </div>
  );
}