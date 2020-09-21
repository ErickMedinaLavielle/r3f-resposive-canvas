import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas, useLoader, Dom } from "react-three-fiber";
import { Block, useBlock } from "./blocks";
import state from "./store";
import img1 from "./assets/img.jpg";
import "./styles.css";

function Plane({ color = "white", ...props }) {
  const [texture] = useLoader(THREE.TextureLoader, [img1]);
  console.log(texture);
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}

function Content({ children }) {
  const { contentMaxWidth } = useBlock();
  const aspect = 1.75;
  return (
    <group position={[0, 0, 0]}>
      <Plane
        scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}
        color="#bfe2ca"
      />
      {children}
    </group>
  );
}

export default function App() {
  return (
    <>
      <Canvas orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Suspense fallback={<Loading />}>
          <Block factor={1.5} offset={0}>
            <Content />
          </Block>
        </Suspense>
      </Canvas>
    </>
  );
}

function Loading() {
  return (
    <Dom center className="loading">
      <h1>Loading...</h1>
    </Dom>
  );
}
