import { Canvas } from '@react-three/fiber'
import './App.css'
import { useEffect, useRef } from 'react';
import { button, useControls } from 'leva';
import { ShaderMaterial } from 'three';
import Spirograph from './Spirograph';

export default function App() {
  const shaderRef = useRef<ShaderMaterial>(null!);
  const [{ n, progress, a1, a2, r1, r2 }, set] = useControls(() =>
  ({
    n: {
      value: 1000,
      min: 2,
      max: 10000,
      step: 1,
    },
    progress: {
      value: 1,
      min: 0,
      max: 1,
    },
    a1: {
      value: 1,
      min: -20,
      max: 20,
      step: 1,
    },
    a2: {
      value: 1,
      min: -20,
      max: 20,
      step: 1,
    },
    r1: {
      value: 50,
      min: 50,
      max: 200,
      step: 1,
    },
    r2: {
      value: 50,
      min: 50,
      max: 200,
      step: 1,
    },
    randomize: button(() => {
      set({
        a1: Math.floor(Math.random() * 41) - 20,
        a2: Math.floor(Math.random() * 41) - 20,
        r1: Math.floor(Math.random() * 151) + 50,
        r2: Math.floor(Math.random() * 151) + 50,
      })
    }),
    "x =": {
      value: "r1cos(θ*a1)+r2cos(θa2)",
      editable: false
    },
    "y =": {
      value: "r1sin(θa1)+r2sin(θa2)",
      editable: false
    },
  })
  );
  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.a1.value = a1 / gcd(a1, a2);
      shaderRef.current.uniforms.a2.value = a2 / gcd(a1, a2);
    }
  }, [a1, a2])
  useEffect(() => {
    if (shaderRef.current) {
      const scale = 0.8 / (r1 + r2);
      shaderRef.current.uniforms.r1.value = r1 * scale;
      shaderRef.current.uniforms.r2.value = r2 * scale;
    }
  }, [r1, r2])
  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.n.value = n;
    }
  }, [n])
  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.progress.value = progress;
    }
  }, [progress])
  return (
    <div className="size-[800px] text-center m-auto">
      <Canvas className="bg-black" gl={{ preserveDrawingBuffer: true }}>
        <Spirograph n={n} shaderRef={shaderRef} />
      </Canvas>
    </div>
  )
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}