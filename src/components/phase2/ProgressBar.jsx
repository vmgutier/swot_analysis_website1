export default function ProgressBar({ currentStep }) {
  const steps = [
    { number: 1, label: 'Define Problem', status: 'current' },
    { number: 2, label: 'Analyze SWOT', status: 'current' },
    { number: 3, label: 'Generate Plan', status: 'next' }
  ]

  return (
    <div className="mb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  currentStep >= step.number
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step.number
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between text-center">
          {steps.map(step => (
            <div key={step.number} className="flex-1">
              <p className={`text-sm font-semibold ${
                currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
