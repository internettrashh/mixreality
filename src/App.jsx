import React, { useEffect, useRef, useState } from "react";
import "aframe";
import "aframe-ui-widgets"; // Ensure you have aframe-ui-widgets for the VR button
import "aframe-environment-component"; // If you're using the environment component
import "./App.css"; // Ensure you have some CSS for the body

function App() {
  const videoRef = useRef(null);
  const [isVRMode, setIsVRMode] = useState(false); // State to control VR mode

  useEffect(() => {
    const video = videoRef.current;

    const constraints = {
      video: { facingMode: "environment" },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });
  }, []);

  const toggleVRMode = () => {
    setIsVRMode(!isVRMode); // Toggle VR mode state
    const sceneEl = document.querySelector("a-scene");
    if (isVRMode) {
      sceneEl.exitVR(); // Exit VR mode
    } else {
      sceneEl.enterVR(); // Enter VR mode
    }
  };

  return (
    <div className="App">
      <button onClick={toggleVRMode}>
        {isVRMode ? "Exit VR" : "Enter VR"}
      </button>
      <a-scene embedded={false} vr-mode-ui="enabled: true;">
        <a-assets>
          <img id="skyTexture" src="path/to/your/sky/texture.jpg" />
        </a-assets>
        <a-sky src="#skyTexture"></a-sky>
        <a-plane
          id="myPlane"
          position="0 0 -200" // Initial position
          width="200"
          height="200"
          material="shader: flat; src: #video"
        ></a-plane>
        {/* Camera entity with look-controls enabled */}
        <a-entity
          camera
          look-controls
          position="0 1.6 0"
          rotation="0 0 0"
          tick={function () {
            const cameraEl = this.el;
            const planeEl = document.querySelector("#myPlane");
            if (cameraEl && planeEl) {
              const cameraPosition = cameraEl.getAttribute("position");
              const cameraRotation = cameraEl.getAttribute("rotation");
              // Update plane's position to match camera's
              planeEl.setAttribute("position", {
                x: cameraPosition.x,
                y: cameraPosition.y,
                z: cameraPosition.z - 5, // Adjust the distance between the camera and the plane
              });
              // Update plane's rotation to match camera's
              planeEl.setAttribute("rotation", {
                x: cameraRotation.x,
                y: cameraRotation.y,
                z: cameraRotation.z,
              });
            }
          }}
        ></a-entity>
      </a-scene>

      <video
        id="video"
        autoPlay
        playsInline
        ref={videoRef}
        style={{ display: "none" }}
      ></video>
    </div>
  );
}

export default App;
