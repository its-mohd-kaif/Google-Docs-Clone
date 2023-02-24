import React from "react";
import CreateFile from "./CreateFile";
// Landing Page Component
function LandingPage() {
  return (
    <div style={{ marginTop: "1em" }}>
      <center>
        <h1>
          <i class="fab fa-google"></i>&nbsp;Docs Clone
        </h1>
        <hr></hr>
        {/* Call Create  A New File Component */}
        <CreateFile />
      </center>
    </div>
  );
}

export default LandingPage;
