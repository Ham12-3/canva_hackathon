import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} action="" className={`${styles.label}`}>
        <label htmlFor="">Course Name</label>
        <input
          type="name"
          name=""
          required
          value={courseInfo.name}
          onChange={(e: any) =>
            setCourseInfo({ ...courseInfo, name: e.target.value })
          }
          id="name"
          placeholder="MERN STack LMS platform with next 13"
          className={`${styles.input}`}
        />
      </form>
    </div>
  );
};

export default CourseInformation;
