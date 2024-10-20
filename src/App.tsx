import { Canvas } from '@react-three/fiber'
import './App.css'
import Scene from './Scene';

export default function App() {
  return (
    <div className="size-[800px] text-center m-auto">
      <Canvas className="bg-black" gl={{ preserveDrawingBuffer: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}