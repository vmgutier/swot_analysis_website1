import { useState } from 'react'
import HeroSection from './components/HeroSection'
import SWOTCards from './components/SWOTCards'
import DragDropSection from './components/DragDropSection'
import ExampleSection from './components/ExampleSection'
import CTASection from './components/CTASection'
import Phase2 from './components/Phase2'
import Phase3 from './components/Phase3'
import './App.css'

export default function App() {
  const [challenge, setChallenge] = useState('')
  const [showMainContent, setShowMainContent] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(1) // 1: Learning, 2: Analysis
  const [swotAnalysis, setSwotAnalysis] = useState(null)

  const handleStartLearning = () => {
    setShowMainContent(true)
  }

  const handleStartAnalysis = () => {
    setCurrentPhase(2)
  }

  const handlePhase2Complete = (analysisData) => {
    setSwotAnalysis(analysisData)
    setCurrentPhase(3)
    console.log('Phase 2 Complete:', analysisData)
  }

  const handleReset = () => {
    setChallenge('')
    setShowMainContent(false)
    setCurrentPhase(1)
    setSwotAnalysis(null)
    window.localStorage.clear()
  }

  const handleBackToPhase1 = () => {
    setCurrentPhase(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleBackToPhase1}>
            <div className="w-8 h-8 bg-gradient-to-br from-swot-strength to-swot-opportunity rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">SWOT Analyzer</h1>
          </div>
          <div className="text-sm text-gray-600 font-semibold">
            {currentPhase === 1 ? 'Part 1: Learn' : currentPhase === 2 ? 'Part 2: Analyze' : 'Part 3: Report'}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {currentPhase === 1 ? (
          <>
            <HeroSection 
              challenge={challenge} 
              setChallenge={setChallenge}
              onStartLearning={handleStartLearning}
            />

            {showMainContent && (
              <div className="space-y-0">
                <SWOTCards />
                <DragDropSection />
                <ExampleSection />
                <CTASection 
                  challenge={challenge}
                  onStartAnalysis={handleStartAnalysis}
                />
              </div>
            )}
          </>
        ) : currentPhase === 2 ? (
          <Phase2 
            initialChallenge={challenge}
            onComplete={handlePhase2Complete}
          />
        ) : (
          <Phase3
            analysisData={swotAnalysis}
            onStartOver={handleReset}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>SWOT Analysis Educational App • Part 1 of 3</p>
          <p className="text-sm mt-2">Learn to analyze challenges systematically</p>
        </div>
      </footer>
    </div>
  )
}
