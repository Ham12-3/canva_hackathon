import { styles } from "../../styles/style";
import React, { FC, useState, useRef } from "react";

import { toast } from "react-hot-toast";

import { VscWorkspaceTrusted } from "react-icons/vsc";
type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  [key: string]: string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });

  const verificationHandler = async () => {
    console.log("test");
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>verify your Account</h1>
      <br />
      <div className="w-full flex -items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex  items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="1100px:w-[70%] m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            key={key}
            ref={inputRefs[index]}
            type="text"
            value={verifyNumber[key]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={1}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-[#00000004a]"
            } `}
          />
        ))}
      </div>
    </div>
  );
};

export default Verification;
