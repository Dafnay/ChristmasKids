import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Star() {
  const starRef = useRef()

  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  const starShape = useMemo(() => {
    const shape = new THREE.Shape()
    const outerRadius = 0.4
    const innerRadius = 0.15
    const points = 5

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i * Math.PI) / points - Math.PI / 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      if (i === 0) {
        shape.moveTo(x, y)
      } else {
        shape.lineTo(x, y)
      }
    }
    shape.closePath()
    return shape
  }, [])

  return (
    <mesh ref={starRef} position={[0, 4.0, 0]} rotation={[0, 0, Math.PI]}>
      <extrudeGeometry
        args={[
          starShape,
          {
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.02,
            bevelSegments: 3,
          },
        ]}
      />
      <meshStandardMaterial
        color="#ffd700"
        emissive="#ffd700"
        emissiveIntensity={0.8}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function TwinklingLight({ position, color, delay = 0 }) {
  const lightRef = useRef()

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.getElapsedTime() + delay
      const intensity = Math.sin(time * 3) * 0.5 + 0.5
      lightRef.current.material.emissiveIntensity = intensity * 2
    }
  })

  return (
    <mesh ref={lightRef} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        metalness={0.5}
        roughness={0.3}
      />
    </mesh>
  )
}

function ChristmasTree() {
  return (
    <group>
      {/* Tree layers - cones */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[2, 3, 32]} />
        <meshStandardMaterial color="#0f5132" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[1.6, 2.5, 32]} />
        <meshStandardMaterial color="#146b3a" />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <coneGeometry args={[1.2, 2, 32]} />
        <meshStandardMaterial color="#1a8f4d" />
      </mesh>

      {/* Tree trunk */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Star on top */}
      <Star />

      {/* Twinkling lights - Bottom layer - all around */}
      <TwinklingLight position={[1.5, -0.5, 0]} color="#ffffff" delay={0} />
      <TwinklingLight position={[0, -0.4, 1.4]} color="#ff0000" delay={0.3} />
      <TwinklingLight position={[-1.3, -0.2, 0]} color="#00ff00" delay={0.6} />
      <TwinklingLight position={[0, 0, -1.5]} color="#0000ff" delay={0.9} />
      <TwinklingLight position={[1.1, 0.2, 1.0]} color="#ffff00" delay={1.2} />
      <TwinklingLight position={[-1.0, 0.4, -1.1]} color="#ffffff" delay={1.5} />

      {/* Extra bottom lights */}
      <TwinklingLight position={[1.8, -0.3, 0.5]} color="#ff0000" delay={0.2} />
      <TwinklingLight position={[-1.6, -0.1, 0.6]} color="#0000ff" delay={0.4} />
      <TwinklingLight position={[0.7, -0.6, 1.6]} color="#ffff00" delay={0.7} />
      <TwinklingLight position={[-0.8, -0.5, -1.4]} color="#00ff00" delay={1.0} />
      <TwinklingLight position={[1.4, 0.1, -0.8]} color="#ffffff" delay={1.3} />
      <TwinklingLight position={[-1.5, 0.3, 0.9]} color="#ff0000" delay={1.6} />
      <TwinklingLight position={[0.5, -0.2, -1.3]} color="#0000ff" delay={1.9} />
      <TwinklingLight position={[-0.6, 0.2, 1.5]} color="#ffff00" delay={2.2} />

      {/* Middle-bottom layer - circular distribution */}
      <TwinklingLight position={[1.2, 0.6, 0.3]} color="#ff0000" delay={1.8} />
      <TwinklingLight position={[0.3, 0.8, 1.2]} color="#00ff00" delay={2.1} />
      <TwinklingLight position={[-1.1, 1.0, 0.2]} color="#0000ff" delay={2.4} />
      <TwinklingLight position={[-0.2, 1.2, -1.0]} color="#ffff00" delay={2.7} />
      <TwinklingLight position={[0.9, 1.4, 0.8]} color="#ffffff" delay={3.0} />
      <TwinklingLight position={[-0.8, 1.5, -0.7]} color="#ff0000" delay={3.3} />

      {/* Middle layer - full circle */}
      <TwinklingLight position={[1.0, 1.7, 0]} color="#00ff00" delay={3.6} />
      <TwinklingLight position={[0.5, 1.9, 0.9]} color="#0000ff" delay={3.9} />
      <TwinklingLight position={[-0.9, 2.1, 0.4]} color="#ffff00" delay={4.2} />
      <TwinklingLight position={[0, 2.3, -0.9]} color="#ffffff" delay={4.5} />
      <TwinklingLight position={[0.7, 2.5, 0.6]} color="#ff0000" delay={4.8} />
      <TwinklingLight position={[-0.6, 2.6, -0.5]} color="#00ff00" delay={5.1} />

      {/* Upper layer - around the top */}
      <TwinklingLight position={[0.7, 2.8, 0.2]} color="#0000ff" delay={5.4} />
      <TwinklingLight position={[0.2, 3.0, 0.7]} color="#ffff00" delay={5.7} />
      <TwinklingLight position={[-0.6, 3.2, 0]} color="#ffffff" delay={6.0} />
      <TwinklingLight position={[0, 3.4, -0.6]} color="#ff0000" delay={6.3} />
      <TwinklingLight position={[0.4, 3.5, 0.3]} color="#00ff00" delay={6.6} />

      {/* Additional front lights */}
      <TwinklingLight position={[0.8, 0.3, 1.3]} color="#0000ff" delay={0.5} />
      <TwinklingLight position={[-0.5, 0.7, 1.1]} color="#ffffff" delay={1.0} />
      <TwinklingLight position={[0.6, 1.1, 1.0]} color="#ff0000" delay={1.5} />
      <TwinklingLight position={[-0.3, 1.5, 0.8]} color="#00ff00" delay={2.0} />
      <TwinklingLight position={[0.4, 1.8, 0.9]} color="#ffff00" delay={2.5} />
      <TwinklingLight position={[-0.2, 2.2, 0.7]} color="#0000ff" delay={3.0} />
      <TwinklingLight position={[0.3, 2.7, 0.5]} color="#ffffff" delay={3.5} />
      <TwinklingLight position={[0, 3.1, 0.4]} color="#ff0000" delay={4.0} />
    </group>
  )
}

export default ChristmasTree
