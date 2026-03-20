import { useState } from 'react'

export default function SWOTInputGrid({
  problemStatement,
  swotData,
  onAddItem,
  onDeleteItem,
  onBack,
  onGenerateActionPlan,
  isComplete
}) {
  const [inputs, setInputs] = useState({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  })

  const swotCategories = [
    {
      key: 'strengths',
      title: 'Strengths',
      icon: '💪',
      description: 'What you do well',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      accentColor: 'text-green-700',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      key: 'weaknesses',
      title: 'Weaknesses',
      icon: '📉',
      description: 'Where you struggle',
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      accentColor: 'text-red-700',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      key: 'opportunities',
      title: 'Opportunities',
      icon: '📈',
      description: 'External growth chances',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      accentColor: 'text-blue-700',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      key: 'threats',
      title: 'Threats',
      icon: '⚠️',
      description: 'External risks',
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      accentColor: 'text-orange-700',
      buttonColor: 'bg-orange-600 hover:bg-orange-700'
    }
  ]

  const handleAddItem = (key) => {
    if (inputs[key].trim()) {
      onAddItem(key, inputs[key])
      setInputs(prev => ({
        ...prev,
        [key]: ''
      }))
    }
  }

  const handleKeyDown = (e, key) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddItem(key)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Problem Reference */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-slideUp">
          Analyzing Your SWOT
        </h1>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 inline-block max-w-2xl animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">Current Challenge</p>
          <p className="text-lg text-gray-900 font-semibold">{problemStatement}</p>
        </div>
      </div>

      {/* SWOT Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        {swotCategories.map((category) => (
          <div
            key={category.key}
            className={`${category.bgColor} border-2 ${category.borderColor} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{category.icon}</span>
              <div>
                <h2 className={`text-2xl font-bold ${category.accentColor}`}>
                  {category.title}
                </h2>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputs[category.key]}
                  onChange={(e) => setInputs(prev => ({
                    ...prev,
                    [category.key]: e.target.value
                  }))}
                  onKeyDown={(e) => handleKeyDown(e, category.key)}
                  placeholder={`Add a ${category.title.toLowerCase()} item...`}
                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                <button
                  onClick={() => handleAddItem(category.key)}
                  className={`px-4 py-2 ${category.buttonColor} text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95`}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              {swotData[category.key].length === 0 ? (
                <div className="p-4 bg-white bg-opacity-50 rounded-lg text-center border-2 border-dashed border-gray-300">
                  <p className="text-sm text-gray-500">No items added yet</p>
                </div>
              ) : (
                swotData[category.key].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 flex items-center justify-between border-l-4 border-gray-400 animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-gray-800 text-sm flex-1">{item}</span>
                    <button
                      onClick={() => onDeleteItem(category.key, index)}
                      className="ml-3 text-red-500 hover:text-red-700 hover:bg-red-50 w-7 h-7 rounded flex items-center justify-center transition-all font-bold"
                      title="Delete item"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Count Badge */}
            <div className="mt-4 text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                swotData[category.key].length > 0
                  ? `${category.bgColor} ${category.accentColor}`
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {swotData[category.key].length} item{swotData[category.key].length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Status */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-12 animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis Progress</h3>
        <div className="space-y-3">
          {swotCategories.map((category) => (
            <div key={category.key} className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">{category.title}</span>
              <div className="flex items-center gap-3">
                <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      swotData[category.key].length > 0
                        ? `w-full ${
                            category.color === 'green' ? 'bg-green-500' :
                            category.color === 'red' ? 'bg-red-500' :
                            category.color === 'blue' ? 'bg-blue-500' :
                            'bg-orange-500'
                          }`
                        : 'w-0 bg-gray-300'
                    }`}
                  ></div>
                </div>
                <span className={`text-sm font-bold ${
                  swotData[category.key].length > 0 ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {swotData[category.key].length > 0 ? '✓' : '○'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation and CTA */}
      <div className="flex gap-4 justify-center mb-12 animate-slideUp" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all duration-300"
        >
          ← Back to Problem
        </button>
        <button
          onClick={onGenerateActionPlan}
          disabled={!isComplete}
          className={`px-8 py-3 font-bold rounded-lg transition-all duration-300 ${
            isComplete
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Generate Action Plan →
        </button>
      </div>

      {/* Requirement Message */}
      {!isComplete && (
        <div className="text-center p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg animate-slideUp" style={{ animationDelay: '0.5s' }}>
          <p className="text-yellow-800 font-medium">
            💡 Add at least one item to each SWOT category to proceed
          </p>
        </div>
      )}
    </div>
  )
}
