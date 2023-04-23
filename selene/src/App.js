import React from "react";
import PreprintViewer from "./PreprintViewer";

function App() {
  return (
    <div>
      <PreprintViewer />
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
