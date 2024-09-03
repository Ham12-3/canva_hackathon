import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.layout?.faq) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("FAQ updated successfully");
      setHasChanges(false); // Reset changes after successful save
    } else if (error) {
      console.error("Error saving FAQ:", error);
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
    setHasChanges(true);
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
    setHasChanges(true);
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
    setHasChanges(true);
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: Date.now().toString(), // Ensure unique ID for new items
        question: "",
        answer: "",
        active: true, // New FAQ should be in edit mode
      },
    ]);
    setHasChanges(true);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some(
      (q) => q.question.trim() === "" || q.answer.trim() === ""
    );
  };

  const handleEdit = async () => {
    console.log("Preparing to save FAQs:", questions); // Debugging: log the questions being saved
    if (
      data &&
      data.layout?.faq &&
      hasChanges &&
      !isAnyQuestionEmpty(questions)
    ) {
      try {
        const response = await editLayout({
          type: "FAQ",
          faq: questions,
        }).unwrap(); // Unwrap the response to handle success/failure directly
        console.log("Save successful:", response);
      } catch (err) {
        console.error("Failed to save FAQ:", err);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <input
                        type="text"
                        className={`${styles.input} border-none`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder={"Add your question..."}
                      />

                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        type="text"
                        className={`${styles.input} border-none`}
                        value={q.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder={"Add your answer..."}
                      />

                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                            setHasChanges(true);
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>

          <div
            className={`${styles.button}
      !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black ${
        hasChanges && !isAnyQuestionEmpty(questions)
          ? "cursor-pointer !bg-[#42d383]"
          : "!cursor-not-allowed bg-[#cccccc34]"
      } !rounded absolute bottom-12 right-12`}
            onClick={
              hasChanges && !isAnyQuestionEmpty(questions)
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
