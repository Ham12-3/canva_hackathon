import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields to go to next");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <div className="mb-6">
        <label className={`${styles.label} text-[20px]`} htmlFor="benefits">
          What are the benefits for students in this course?
        </label>
        <div className="space-y-4 mt-4">
          {benefits.map((benefit: any, index: number) => (
            <input
              type="text"
              key={index}
              placeholder="You will be able to build a full stack LMS platform"
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
              className={`${styles.input}`}
            />
          ))}
          <AddCircleIcon
            style={{ margin: "10px 0", cursor: "pointer", width: "30px" }}
            onClick={handleAddBenefits}
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className={`${styles.label} text-[20px]`}
          htmlFor="prerequisites"
        >
          What are the prerequisites for starting this course?
        </label>
        <div className="space-y-4 mt-4">
          {prerequisites.map((prerequisite: any, index: number) => (
            <input
              type="text"
              key={index}
              placeholder="You need advanced knowledge of MERN stack"
              value={prerequisite.title}
              onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
              className={`${styles.input}`}
            />
          ))}
          <AddCircleIcon
            style={{ margin: "10px 0", cursor: "pointer", width: "30px" }}
            onClick={handleAddPrerequisites}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded cursor-pointer"
          onClick={prevButton}
        >
          Prev
        </button>
        <button
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded cursor-pointer"
          onClick={handleOptions}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
