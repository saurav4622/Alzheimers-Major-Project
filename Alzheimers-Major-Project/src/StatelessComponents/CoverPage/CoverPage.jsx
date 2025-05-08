import React from "react";
import coverImage from "../../assets/cover-page.png";
import "./CoverPage.css";

const CoverPage = () => {
//   useEffect(() => {
//     // Store previous body styles
//     const prevDisplay = document.body.style.display;
//     const prevPlaceItems = document.body.style.placeItems;

//     // Remove flex and center ONLY for this page
//     document.body.style.display = "block";
//     document.body.style.placeItems = "initial";

//     // When component unmounts, restore old styles
//     return () => {
//       document.body.style.display = prevDisplay;
//       document.body.style.placeItems = prevPlaceItems;
//     };
//   }, []);

  return (
    <div className="cover-page">
      <div className="overlay"></div>

      <div className="content">
        <div className="left">
          <img src={coverImage} alt="Human Neuro Image" />
        </div>

        <div className="right">
          <h1>NeuroVision: AI-Driven MRI Analysis for Alzheimer's Detection</h1>
          <h2>Revolutionizing Neurological Insights with AI</h2>

          <div className="buttons">
            <button className="login-btn">Login now</button>
            <button className="signup-btn">Signup now</button>
          </div>

          <p>
            Our AI-driven system analyzes MRI scans to assist in early Alzheimer's detection,
            bridging the gap between technology and healthcare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
