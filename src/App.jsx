import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ChristmasTree from './components/ChristmasTree'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-green-900 to-blue-950 text-white overflow-hidden">
      {/* Snowflakes background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 10 + 10}px`,
              animationDuration: `${Math.random() * 3 + 5}s`
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Header */}
      {/* <header className="relative z-10 p-6">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-yellow-300">🎄 Christmas Kids</h1>
          <div className="space-x-6">
          </div>
        </nav>
      </header> */}

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-6xl font-bold leading-tight">
              Juegos Navideños
            </h2>
          </div>

          {/* Right 3D Animation */}
          <div className="h-96 md:h-[500px]">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffd700" />
              <ChristmasTree />
              <OrbitControls enableZoom={false} target={[0, 1, 0]} />
            </Canvas>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition">
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold mb-3">Juego 1</h3>
            <p className="text-gray-200">Descripción del juego 1</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition">
            <div className="text-5xl mb-4">🎅</div>
            <h3 className="text-2xl font-bold mb-3">Juego 2</h3>
            <p className="text-gray-200">Descripción del juego 2</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold mb-3">Juego 3</h3>
            <p className="text-gray-200">Descripción del juego 3</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-32 py-8 text-center text-gray-300">
        <p>Creado con ❤️ para la Navidad 2025/2026</p>
      </footer>
    </div>
  )
}

export default App
