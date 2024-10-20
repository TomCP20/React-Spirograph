import { MutableRefObject, useMemo } from "react";
import { ShaderMaterial } from "three";

import fragmentShader from './shaders/fragmentShader.glsl??raw'
import vertexShader from './shaders/vertexShader.glsl??raw'

export default function Spirograph({ n, shaderRef }: Readonly<{ n: number, shaderRef: MutableRefObject<ShaderMaterial> }>) {
    const vertices = new Float32Array(n * 3);
    const uniforms = useMemo(
        () => (
            {
                n: { value: 1000 },
                progress: { value: 1 },
                a1: { value: 1 },
                a2: { value: 1 },
                r1: { value: 0.4 },
                r2: { value: 0.4 },
            }
        ),
        []
    );
    return (
        <line>
            <bufferGeometry>
                <bufferAttribute attach={"attributes-position"} array={vertices} itemSize={3} count={(n + 1)} />
            </bufferGeometry>
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} ref={shaderRef} />
        </line>
    );
}