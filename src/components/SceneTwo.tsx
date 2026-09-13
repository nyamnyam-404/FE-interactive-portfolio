function SceneTwo() {
  return (
    <div className="scene scene-3">
      <div
        className="parallax-layer mountain-back"
        data-speed="0.4"
      >
        BACK
      </div>

      <div
        className="parallax-layer mountain-front"
        data-speed="0.2"
      >
        MIDDLE
      </div>

      <div
        className="parallax-layer trees"
        data-speed="-0.15"
      >
        FRONT
      </div>

      <h1>SCENE 02</h1>
    </div>
  );
}

export default SceneTwo;