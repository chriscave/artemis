import React from "react";
import PDFViewer from "./PDFViewer";
import PreprintCommentSection from "./PreprintCommentSection";

function App() {
  return (
    <div>
      <PreprintCommentSection />
    </div>
  );
}

// React component
// import React, { useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");

//   const handleClick = async () => {
//     const response = await fetch("api/hello");
//     const data = await response.json();
//     setMessage(data.message);
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>Say Hello</button>
//       <p>{message}</p>
//     </div>
//   );
// }

export default App;
