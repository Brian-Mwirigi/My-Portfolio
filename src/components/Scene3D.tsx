'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  useGLTF,
  Environment,
  ContactShadows,
  Sparkles,
  Stars
} from '@react-three/drei'
import * as THREE from 'three'

// Astronaut Space Suit - Main hero element
function Astronaut() {
  const { scene } = useGLTF('/models/franz_viehbocks_sokol_space_suit.glb')
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3 + state.clock.elapsedTime * 0.05
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[2.2, -0.5, 0]} scale={1.8}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

// Spaceship with wormhole animation
function Spaceship() {
  const { scene, animations } = useGLTF('/models/24_dizzying_space_travel_-_inktober2019.glb')
  const groupRef = useRef<THREE.Group>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)

  // Setup animation
  useMemo(() => {
    if (animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(scene)
      animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip)
        action.play()
      })
    }
  }, [animations, scene])

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[-3, 0.5, -3]} scale={0.4} rotation={[0.2, 0.5, 0]}>
      <primitive object={scene} />
    </group>
  )
}

// Sci-Fi Crate
function SciFiCrate() {
  const { scene } = useGLTF('/models/star_citizen_workflow_to_sketchfab__-_decals_3 (1).glb')
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[-2.5, -1.5, 1]} scale={0.5}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

// Particle field for depth
function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 3
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color="#4f46e5" wireframe />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} color="#8b5cf6" />
        <spotLight position={[5, 10, 5]} intensity={1.5} angle={0.3} penumbra={1} color="#ffffff" castShadow />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color="#06b6d4" />
        
        {/* Environment for realistic reflections */}
        <Environment preset="city" />

        {/* Stars background */}
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

        {/* Sparkles effect */}
        <Sparkles count={100} scale={15} size={2} speed={0.3} color="#8b5cf6" opacity={0.5} />

        {/* 3D Models */}
        <Suspense fallback={<Loader />}>
          <Astronaut />
          <Spaceship />
          <SciFiCrate />
        </Suspense>

        {/* Particle field */}
        <ParticleField />

        {/* Contact shadow for grounding */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
        />
      </Canvas>
    </div>
  )
}

// Preload models
useGLTF.preload('/models/franz_viehbocks_sokol_space_suit.glb')
useGLTF.preload('/models/24_dizzying_space_travel_-_inktober2019.glb')
useGLTF.preload('/models/star_citizen_workflow_to_sketchfab__-_decals_3 (1).glb')
