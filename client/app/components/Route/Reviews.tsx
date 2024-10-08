import React from "react";

type Props = {};
import Image from "next/image";
import { styles } from "@/app/styles/style";
import ReviewCard from "../Review/ReviewCard";

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 4,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 4,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 3,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 5,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 4,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/0.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 3,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/0.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 4,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 1,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 2,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 3,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 4,
  },

  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    profession: "Student | Oxford University",
    comment:
      "I am not happy at all with the course. The course is not well structured and the instructor is not clear in his explanations. I would not recommend this course to anyone.",
    ratings: 3,
  },
];

const Reviews = (props: Props) => {
  return (
    <div>
      <div className="w-[90%] flex items-center justify-between 800px:w-[85%] m-auto  ">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/business.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="mt-20 ml-10 mr-10 grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0  md:[&>*nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
