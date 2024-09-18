import { styles } from "@/app/styles/style";
import React, { FC, useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import toast from "react-hot-toast";
import { ContentItem } from "./types";

type Link = {
  title: string;
  url: string;
};

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: ContentItem[];
  setCourseContentData: (courseContentData: ContentItem[]) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState<number>(1);

  // Keep track of the changes made to the course content data
  useEffect(() => {
    console.log(courseContentData); // This helps track the updates in console
  }, [courseContentData]);

  // Handle collapse toggle for sections
  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  // Handle removing a link
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  // Handle adding a new link
  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  // Handle input changes for course content
  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedData = courseContentData.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setCourseContentData(updatedData);
  };

  // Handle adding new content
  const newContentHandler = (item: ContentItem) => {
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

    const newContent: ContentItem = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: newVideoSection,
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  // Handle adding a new section
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

    const newContent: ContentItem = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: `Untitled section ${activeSection}`,
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  // Previous step button handler
  const prevButton = () => {
    setActive(active - 1);
  };

  // Handle moving to the next step and submitting the data
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

    // Move to the next step and trigger the submission
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
                  {/* Video Title Input */}
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

                  {/* Video URL Input */}
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

                  {/* Video Length Input */}
                  <div className="mb-3">
                    <label htmlFor="" className={styles.label}>
                      Video Length (in minutes)
                    </label>
                    <input
                      type="number"
                      placeholder="20mins"
                      className={`${styles.input}`}
                      value={item.videoLength || ""}
                      onChange={(e) =>
                        handleInputChange(index, "videoLength", e.target.value)
                      }
                    />
                  </div>

                  {/* Video Description Input */}
                  <div className="mb-3">
                    <label htmlFor="" className={styles.label}>
                      Description
                    </label>
                    <textarea
                      placeholder="Description of video"
                      className={`${styles.input}`}
                      value={item.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                    />
                  </div>

                  {/* Resource Links */}
                  {item.links.map((link, linkIndex) => (
                    <div key={linkIndex}>
                      <div className="flex w-full items-center justify-between">
                        <div className="w-[96%]">
                          <label htmlFor="" className={styles.label}>
                            Resource Title
                          </label>
                          <input
                            type="text"
                            placeholder="Resource title"
                            className={styles.input}
                            value={link.title}
                            onChange={(e) =>
                              handleInputChange(index, "links", [
                                ...item.links.slice(0, linkIndex),
                                {
                                  ...link,
                                  title: e.target.value,
                                },
                                ...item.links.slice(linkIndex + 1),
                              ])
                            }
                          />
                        </div>
                        <BsLink45Deg
                          className="cursor-pointer dark:text-white text-black"
                          onClick={() => handleRemoveLink(index, linkIndex)}
                        />
                      </div>

                      <label htmlFor="" className={styles.label}>
                        URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://abc.com"
                        className={styles.input}
                        value={link.url}
                        onChange={(e) =>
                          handleInputChange(index, "links", [
                            ...item.links.slice(0, linkIndex),
                            { ...link, url: e.target.value },
                            ...item.links.slice(linkIndex + 1),
                          ])
                        }
                      />
                    </div>
                  ))}

                  {/* Add New Link Button */}
                  <div
                    className="flex items-center mt-2 cursor-pointer"
                    onClick={() => handleAddLink(index)}
                  >
                    <AiOutlinePlusCircle className="dark:text-white text-black" />
                    <p className="ml-2 text-[#03a9f4]">Add new link</p>
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* Add Section Button */}
        <div
          className="w-full bg-[#03a9f4] p-2 rounded-lg flex items-center justify-center mt-3 cursor-pointer"
          onClick={addNewSection}
        >
          <AiOutlinePlusCircle className="text-white" />
          <p className="text-white ml-2">Add new section</p>
        </div>

        {/* Form Navigation Buttons */}
        <div className="flex w-full items-center justify-between pt-10">
          <button
            className="bg-[#03a9f4] p-2.5 text-white rounded-lg text-[18px] font-Poppins cursor-pointer"
            onClick={prevButton}
          >
            Previous
          </button>
          <button
            className="bg-[#03a9f4] p-2.5 text-white rounded-lg text-[18px] font-Poppins cursor-pointer"
            onClick={handleOptions}
          >
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseContent;
