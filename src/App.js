import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import neonLoader from "./spinner.gif";

import * as mobilenet from "@tensorflow-models/mobilenet";

function App() {
  const [img, setIMG] = useState();
  const [predicted, setPredicted] = useState();
  const [loader, setLoader] = useState(false);
  const model = async (ele) => {
    const mob = await mobilenet.load();
    predictions(mob, ele);
  };
  const predictions = async (mob, ele) => {
    const res = await mob.classify(ele);
    setPredicted(res[0].className.toUpperCase());
    setLoader(false);
  };
  useEffect(() => {
    if (img) {
      const ele = document.getElementById("selectedIMG");
      setLoader(true);
      setPredicted("");
      model(ele);
    }
  }, [img]);
  const imgProces = (event) => {
    setIMG(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="App">
      {/* <img id="background" className="backgroundIMG" src={loader} /> */}
      <header className="App-header">
        {img && (
          <div className="inputIMG">
            <img id="selectedIMG" className="" src={img} alt="crap!!" />
          </div>
        )}
        {loader ? (
          <div className="result " id="loaderBack">
            <img
              style={{
                width: "5rem",
              }}
              src={neonLoader}
            />
          </div>
        ) : predicted ? (
          <strong className="result addspace">{predicted}</strong>
        ) : (
          ""
        )}
        <div className="backdrop">
          <label>
            Enter Your File
            <input
              type="file"
              size="60"
              onChange={(e) => {
                imgProces(e);
              }}
            />
          </label>
        </div>
      </header>
    </div>
  );
}

export default App;
