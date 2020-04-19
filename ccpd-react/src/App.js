import React, { useState } from "react";
import logo from "./logo.svg";

import { Plugins } from "@capacitor/core";

function App() {
  const { CameraPreview, BiometricAuth } = Plugins;
  const [image, setImage] = useState(null);

  return (
    <div className="App">
      <div style={{ width: "200px", height: "200px" }} id="cam"></div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={() => {
            CameraPreview.start({ position: "rear", parent: "cam" });
          }}
        >
          Show camera preview
        </button>
        <button
          onClick={async () => {
            try {
              await CameraPreview.flip();
              console.log("flipped");
            } catch (e) {
              console.log("not flipped");
            }
          }}
        >
          Flip camera preview
        </button>
        <button
          onClick={async () => {
            try {
              await CameraPreview.stop();
              console.log("flipped");
            } catch (e) {
              console.log("not flipped");
            }
          }}
        >
          Stop camera preview
        </button>
        <button
          onClick={async () => {
            const result = await CameraPreview.capture();
            console.log(result.value);
            setImage(result.value);

            CameraPreview.stop();
          }}
        >
          Capture
        </button>

        <br />
        <button
          onClick={async () => {
            const result = await BiometricAuth.verify({
              reason: "Message ...",
            });
            console.log(result);
          }}
        >
          BiometricAuth
        </button>

        <button
          onClick={async () => {
            const result = await BiometricAuth.isAvailable();
            console.log(result);
          }}
        >
          BiometricAuth
        </button>
        {image && <img alt="img" src={`data:image/png;base64, ${image}`} />}
      </header>
    </div>
  );
}

export default App;
