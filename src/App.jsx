import { useControls } from "leva";
import ChunkBase from "./components/Chunking/ChunkBase";
import PlanetBase from "./components/PlanetChunk/PlanetBase";
import Base from "./components/Terrain/Base";
import ThreeContainer from "./components/ThreeContainer";
import GrassBase from "./components/GrassAgain/GrassBase";
import InstanceBase from "./components/Instancing/InstanceBase";

function App() {
  const { scene } = useControls("Scene", {
    scene: {
      options: [
        "grass",
        "3x3 Land",
        "Chunking",
        "Planet",
        "grassBase",
        "Instancing",
      ],
      value: "grassBase",
    },
  });
  const renderScene = () => {
    switch (scene) {
      case "grass":
        return <ThreeContainer />;
      case "3x3 Land":
        return <Base />;
      case "Chunking":
        return <ChunkBase />;
      case "Planet":
        return <PlanetBase />;
      case "grassBase":
        return <GrassBase />;
      case "Instancing":
        return <InstanceBase />;
    }
  };
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>{renderScene()}</div>
    </>
  );
}

export default App;
