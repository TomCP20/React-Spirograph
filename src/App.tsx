import { Canvas } from '@react-three/fiber'
import './App.css'
import fragmentShader from './shaders/fragmentShader.glsl??raw'
import vertexShader from './shaders/vertexShader.glsl??raw'
import { useEffect, useMemo, useRef } from 'react';
import { button, useControls } from 'leva';
import { ShaderMaterial } from 'three';

export default function App() {
  const ref = useRef<ShaderMaterial>(null!);
  const n = 1000;
  const [{ a1, a2, r1, r2 }, set] = useControls(() => 
    ({
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
          a1: Math.floor(Math.random()*41)-20,
          a2: Math.floor(Math.random()*41)-20,
          r1: Math.floor(Math.random()*151)+50,
          r2: Math.floor(Math.random()*151)+50,
        })
      })
    })
  );
  useEffect(() => {
    if (ref.current) {
      ref.current.uniforms.a1.value = a1/gcd(a1, a2);
      ref.current.uniforms.a2.value = a2/gcd(a1, a2);
    }
  }, [a1, a2])
  useEffect(() => {
    if (ref.current) {
      const scale = 0.8/(r1+r2);
      ref.current.uniforms.r1.value = r1*scale;
      ref.current.uniforms.r2.value = r2*scale;
    }
  }, [r1, r2])
  const vertices = new Float32Array(n * 3);
  const uniforms = useMemo(
    () => (
      {
        n: { value: n },
        a1: { value: 1 },
        a2: { value: 1 },
        r1: { value: 0.4 },
        r2: { value: 0.4 },
      }
    ),
    []
  );
  return (
    <div className="size-[800px] text-center m-auto">
      <Canvas className="bg-black" gl={{ preserveDrawingBuffer: true }}>
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute attach={"attributes-position"} array={vertices} itemSize={3} count={n} />
          </bufferGeometry>
          <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} ref={ref} />
        </lineLoop>
      </Canvas>
    </div>
  )
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}