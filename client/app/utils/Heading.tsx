import React, { FC } from "react";

interface HeadProps {
  title: string;
  description: string;
  keywords: string;
}

const Heading: FC<HeadProps> = ({ title, description, keywords }) => {
  return (
    <>
      <title>{title}</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

      <meta name="viewport" content="width=device-width, initial-scale =1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
};

export default Heading;
