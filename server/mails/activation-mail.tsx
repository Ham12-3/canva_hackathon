// ActivationMail.tsx
import React from "react";

interface ActivationMailProps {
  userName: string;
  activationCode: string;
}

const ActivationMail: React.FC<ActivationMailProps> = ({
  userName,
  activationCode,
}) => {
  return (
    <html>
      <head>
        <title>Account Activation</title>
        <style>
          {` body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }

                    .container {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        width: 90%;
                        max-width: 600px;
                        text-align: left;
                    }

                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .header h1 {
                        color: #333;
                        margin-top: 0;
                        font-size: 24px;
                    }

                    .content p {
                        color: #555;
                        line-height: 1.6;
                        margin-bottom: 20px;
                    }

                    .activation-code {
                        text-align: center;
                        font-size: 20px;
                        font-weight: bold;
                        color: #007bff;
                        margin: 20px 0;
                    }

                    .button-container {
                        text-align: center;
                    }

                    .activation-button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin: 20px 0;
                        background-color: #007bff;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                    }

                    .activation-button:hover {
                        background-color: #0056b3;
                    }

                    .footer {
                        text-align: center;
                        color: #888;
                        font-size: 12px;
                        margin-top: 20px;
                    }

                    `}
        </style>
      </head>

      <body>
        <div className="container">
          <div className="header">
            <h1>Account Activation</h1>
          </div>
          <div className="content">
            <p>Hello {userName},</p>
            <p>
              Thank you for registering with Lacodemy. To activate your account,
              please use the following activation code:
            </p>
            <div className="activation-code">{activationCode}</div>
            <p>
              Please enter this code on the activation page within the next 5
              minutes.
            </p>
            <p>
              If you did not register for a Lacodemy account, please ignore this
              email.
            </p>
          </div>
          <div className="footer">
            &copy; 2024 Lacodemy. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  );
};

export default ActivationMail;
