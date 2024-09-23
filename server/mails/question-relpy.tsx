import React from "react";

interface QuestionReplyMailProps {
  name: string;
  title: string;
}

const QuestionReplyMail: React.FC<QuestionReplyMailProps> = ({
  name,
  title,
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Reply Notification</title>
      </head>
      <body>
        <h1>Hello {name},</h1>
        <p>
          A new reply has been added to your question in the video "
          <strong>{title}</strong>"
        </p>
        <p>
          Please login to our website to view the reply and continue the
          discussion.
        </p>
        <p>Thank you for being a part of our community.</p>
      </body>
    </html>
  );
};

export default QuestionReplyMail;
