import { useState } from 'react'
import ProgressBar from './phase2/ProgressBar'
import ProblemStatement from './phase2/ProblemStatement'
import SWOTInputGrid from './phase2/SWOTInputGrid'

export default function Phase2({ initialChallenge, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [problemStatement, setProblemStatement] = useState(initialChallenge)
  const [swotData, setSWOTData] = useState({
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  })

  const handleProblemSubmit = (problem) => {
    setProblemStatement(problem)
    setCurrentStep(2)
  }

  const handleBackToProblem = () => {
    setCurrentStep(1)
  }

  const handleAddItem = (category, item) => {
    if (item.trim()) {
      setSWOTData(prev => ({
        ...prev,
        [category]: [...prev[category], item.trim()]
      }))
    }
  }

  const handleDeleteItem = (category, index) => {
    setSWOTData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }))
  }

  const isPhase2Complete = 
    swotData.strengths.length > 0 &&
    swotData.weaknesses.length > 0 &&
    swotData.opportunities.length > 0 &&
    swotData.threats.length > 0

  const handleGenerateActionPlan = () => {
    if (onComplete) {
      onComplete({
        problem: problemStatement,
        swot: swotData
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 pb-20">
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      <div className="max-w-6xl mx-auto px-4">
        {currentStep === 1 ? (
          <ProblemStatement 
            initialValue={problemStatement}
            onSubmit={handleProblemSubmit}
          />
        ) : (
          <SWOTInputGrid
            problemStatement={problemStatement}
            swotData={swotData}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onBack={handleBackToProblem}
            onGenerateActionPlan={handleGenerateActionPlan}
            isComplete={isPhase2Complete}
          />
        )}
      </div>
    </div>
  )
}
