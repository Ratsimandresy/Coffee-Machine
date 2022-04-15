import React, { useState } from "react";
import { ReportService } from "../../services/ReportService";

const Index = ({ commands }) => {
  const service = new ReportService();
  const { getTotalDrink, getTotalEarned } = service;

  const [show, setShow] = useState(false);
  const [content, setContent] = useState("Get Report");

  const handleClick = () => {
    // showing the  daily report
    if (content === "Get Report") {
      console.log(`Number of total drinks sold : ${getTotalDrink(commands)}`);
      console.log(`Total money earned today : ${getTotalEarned(commands)}`);
      console.table(commands.length ? commands : "No drinks sold yet !");
    }

    setShow(!show);
    return content === "Get Report"
      ? setContent("hide info")
      : setContent("Get Report");
  };
  return (
    <>
      <button data-testid="report-btn" onClick={() => handleClick()}>
        {content}
      </button>
      {show && <p role="contentinfo">Open the console to see the report</p>}
    </>
  );
};

export default Index;
