import React, { useState } from "react";
import { ReportService } from "../../services/ReportService";

const Index = ({ commands }) => {
  const service = new ReportService();
  const { getTotalDrink, getTotalEarned } = service;

  const [show, setShow] = useState(false);
  const [content, setContent] = useState("Get Report");

  const handleClick = () => {
    setShow(!show);
    return content === "Get Report"
      ? setContent("hide info")
      : setContent("Get Report");
  };
  return (
    <>
      <button onClick={() => handleClick()}>{content}</button>
      {show && <p>Open the console to see the report</p>}
    </>
  );
};

export default Index;
