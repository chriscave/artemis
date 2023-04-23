import React from "react";
import PDFViewer from "./PDFViewer";
import PreprintCommentSection from "./PreprintCommentSection";
import "./style.css";

const PreprintViewer = () => {
  return (
    // <div style={{ display: "flex" }}>
    //   <div style={{ flexGrow: 1 }}>
    //     <p>Hello</p>
    //   </div>
    //   <div style={{ flexGrow: 1 }}>
    //     <p>Goodbye</p>
    //   </div>
    <div style={{ display: "flex" }}>
      <PDFViewer />
      <PreprintCommentSection style={{ flexGrow: 1 }} />
    </div>
  );
};

export default PreprintViewer;
