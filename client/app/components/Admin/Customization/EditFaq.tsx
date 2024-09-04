import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useAddLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

const EditFaq = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [editLayout, { isSuccess: editSuccess, error: editError, reset }] =
    useEditLayoutMutation();
  const [addLayout, { isSuccess: addSuccess, error: addError }] =
    useAddLayoutMutation();
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Load the FAQ data when it becomes available
  useEffect(() => {
    if (data && data.layout?.faq) {
      setQuestions(data.layout.faq);
    }
    if (editSuccess || addSuccess) {
      refetch(); // Refetch to update the UI with the latest
      toast.success("FAQ updated successfully");
      setHasChanges(false);
      reset();
    }
    if (editError || addError) {
      const error: any = editError || addError;
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, editSuccess, addSuccess, editError, addError, refetch, reset]);

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
        _id: Date.now().toString(),
        question: "",
        answer: "",
        active: true,
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
    if (hasChanges && !isAnyQuestionEmpty(questions)) {
      if (data && data.layout?.faq && data.layout.faq.length > 0) {
        // Update existing FAQs
        await editLayout({
          type: "FAQ",
          faq: questions,
        }).unwrap();
      } else {
        // Add new FAQs
        await addLayout({
          type: "FAQ",
          faq: questions,
          image: "", // If you have other required fields, include them here
          title: "",
          subTitle: "",
          categories: [], // Example empty arrays if not required
        }).unwrap();
      }
    } else {
      toast.error("Please fill out all questions and answers before saving.");
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
                        onChange={(e) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder="Add your question..."
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
                        onChange={(e) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder="Add your answer..."
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
                : () => toast.error("Please make changes before saving.")
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
