/* eslint-disable @typescript-eslint/ban-types */
import React, { Dispatch, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { IJobForm } from "./AddJobForm";

const TextEditor = ({
  updateData,
  currentData,
}: {
  updateData: Dispatch<IJobForm>;
  currentData: any;
}) => {
  const [value, setValue] = useState("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    updateData({ ...currentData, jobDescription: newValue });
  };

  return (
    <div className="text-lg">
      <ReactQuill theme="snow" value={value} onChange={handleChange} />
    </div>
  );
};

export default TextEditor;
