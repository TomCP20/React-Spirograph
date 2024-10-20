import { useFrame } from "@react-three/fiber";
import { useControls, button } from "leva";
import { useRef, useState, useEffect } from "react";
import { ShaderMaterial } from "three";
import Spirograph from "./Spirograph";

export default function Scene() {
  const shaderRef = useRef<ShaderMaterial>(null!);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(1);
  const [{ n, a1, a2, r1, r2 }, set] = useControls(() => ({
    n: {
      value: 1000,
      min: 2,
      max: 10000,
      step: 1,
    },
    progress: {
      value: progress,
      min: 0,
      max: 1,
      disabled: animating,
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
      });
    }),
    animate: button(() => {
      setProgress(0);
      setAnimating(true);
    }, { disabled: animating }),
    "x =": {
      value: "r1cos(θ*a1)+r2cos(θa2)",
      editable: false
    },
    "y =": {
      value: "r1sin(θa1)+r2sin(θa2)",
      editable: false
    },
  }), [animating]
  );
  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.a1.value = a1 / gcd(a1, a2);
      shaderRef.current.uniforms.a2.value = a2 / gcd(a1, a2);
    }
  }, [a1, a2]);
  useEffect(() => {
    if (shaderRef.current) {
      const scale = 0.8 / (r1 + r2);
      shaderRef.current.uniforms.r1.value = r1 * scale;
      shaderRef.current.uniforms.r2.value = r2 * scale;
    }
  }, [r1, r2]);
  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.n.value = n;
    }
  }, [n]);
  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.progress.value = progress;
      set({progress: progress});
    }
  }, [progress, set]);
  useFrame((_state, delta) => {
    if (animating) {
      setProgress(Math.min(progress + delta / 5, 1));
      if (progress === 1) {
        setAnimating(false);
      }
    }
  });
  return <Spirograph n={n} shaderRef={shaderRef} />;
}
function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}
