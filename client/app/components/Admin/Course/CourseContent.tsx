import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any[];
  setCourseContentData: (courseContentData: any[]) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedData = courseContentData.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all fields first!");
      return;
    }

    const newVideoSection =
      courseContentData.length > 0
        ? courseContentData[courseContentData.length - 1].videoSection
        : "";

    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: newVideoSection,
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  const addNewSection = () => {
    const lastContent = courseContentData[courseContentData.length - 1];
    if (
      lastContent.title === "" ||
      lastContent.description === "" ||
      lastContent.videoUrl === "" ||
      lastContent.links[0].title === "" ||
      lastContent.links[0].url === ""
    ) {
      toast.error("Please fill all fields first!");
      return;
    }

    setActiveSection(activeSection + 1);

    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: `Untitled section ${activeSection}`,
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    const lastContent = courseContentData[courseContentData.length - 1];
    if (
      lastContent.title === "" ||
      lastContent.description === "" ||
      lastContent.videoUrl === "" ||
      lastContent.links[0].title === "" ||
      lastContent.links[0].url === ""
    ) {
      toast.error("Section can't be empty");
      return;
    }

    setActive(active + 1);
    handleSubmit();
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form action="" onSubmit={(e) => e.preventDefault()}>
        {courseContentData.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
            >
              {showSectionInput && (
                <>
                  <div className="flex w-full items-center">
                    <input
                      type="text"
                      className={`text-[20px] ${
                        item.videoSection === "Untitled section"
                          ? "w-[170px]"
                          : "w-max"
                      } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                      value={item.videoSection}
                      onChange={(e) =>
                        handleInputChange(index, "videoSection", e.target.value)
                      }
                    />
                    <BsPencil className="cursor-pointer dark:text-white text-black" />
                  </div>
                  <br />
                </>
              )}

              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] ? (
                  item.title && (
                    <p className="font-Poppins dark:text-white text-black">
                      {index + 1}. {item.title}
                    </p>
                  )
                ) : (
                  <div></div>
                )}

                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className="dark:text-white text-black"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>

              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label htmlFor="" className={styles.label}>
                      Video Title
                    </label>
                    <input
                      type="text"
                      placeholder="Project Plan"
                      className={`${styles.input}`}
                      value={item.title}
                      onChange={(e) =>
                        handleInputChange(index, "title", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className={styles.label}>
                      Video URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://abc.com"
                      className={`${styles.input}`}
                      value={item.videoUrl}
                      onChange={(e) =>
                        handleInputChange(index, "videoUrl", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className={styles.label}>
                      Video Length (in minutes)
                    </label>
                    <input
                      type="number"
                      placeholder="20mins"
                      className={`${styles.input}`}
                      value={item.videoLength || ""} // Ensure videoLength is properly handled
                      onChange={(e) =>
                        handleInputChange(index, "videoLength", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className={styles.label}>
                      Video Description
                    </label>
                    <textarea
                      rows={8}
                      className={`${styles.input} !h-min py-2`}
                      placeholder="Describe the video"
                      value={item.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                    />
                    <br />
                    <br />
                    <br />
                  </div>

                  {item.links.map((link: any, linkIndex: any) => (
                    <div key={linkIndex} className="mb-3">
                      <div className="w-full flex items-center justify-between">
                        <label className={styles.label}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${
                            linkIndex === 0
                              ? "cursor-no-drop"
                              : "cursor-pointer"
                          } text-black dark:text-white text-[20px]`}
                          onClick={() =>
                            linkIndex === 0
                              ? null
                              : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Link Title"
                        className={styles.input}
                        value={link.title}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            `links[${linkIndex}].title`,
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Link URL"
                        className={styles.input}
                        value={link.url}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            `links[${linkIndex}].url`,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                  <p
                    className="text-[#1a73e8] dark:text-gray-400 hover:underline cursor-pointer"
                    onClick={() => handleAddLink(index)}
                  >
                    <BsLink45Deg />
                    Add new link
                  </p>
                </>
              )}
            </div>
          );
        })}

        <div className="mt-4">
          <button
            className={`${styles.button} mx-4 !bg-black dark:!bg-white !text-white dark:!text-black`}
            onClick={() => prevButton()}
          >
            Back
          </button>
          <button
            className={`${styles.button} mx-4 !bg-black dark:!bg-white !text-white dark:!text-black`}
            onClick={() => addNewSection()}
          >
            Add new section
          </button>
          <button
            className={`${styles.button} mx-4 !bg-black dark:!bg-white !text-white dark:!text-black`}
            onClick={() => handleOptions()}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseContent;
