import { useState, useEffect } from 'react'

export default function DragDropSection() {
  const [items, setItems] = useState([
    { id: 1, text: 'Strong brand reputation', type: 'internal', correct: true },
    { id: 2, text: 'Limited budget', type: 'internal', correct: true },
    { id: 3, text: 'New competitor entering market', type: 'external', correct: true },
    { id: 4, text: 'Growing customer demand', type: 'external', correct: true },
  ])

  const [internalItems, setInternalItems] = useState([])
  const [externalItems, setExternalItems] = useState([])
  const [allCorrect, setAllCorrect] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleDragStart = (e, item) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('application/json', JSON.stringify(item))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropInternal = (e) => {
    e.preventDefault()
    const item = JSON.parse(e.dataTransfer.getData('application/json'))
    
    if (!internalItems.find(i => i.id === item.id) && !externalItems.find(i => i.id === item.id)) {
      setInternalItems([...internalItems, item])
      setItems(items.filter(i => i.id !== item.id))
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 2000)
    }
  }

  const handleDropExternal = (e) => {
    e.preventDefault()
    const item = JSON.parse(e.dataTransfer.getData('application/json'))
    
    if (!internalItems.find(i => i.id === item.id) && !externalItems.find(i => i.id === item.id)) {
      setExternalItems([...externalItems, item])
      setItems(items.filter(i => i.id !== item.id))
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 2000)
    }
  }

  const handleRemoveInternal = (id) => {
    const item = internalItems.find(i => i.id === id)
    setInternalItems(internalItems.filter(i => i.id !== id))
    setItems([...items, item])
  }

  const handleRemoveExternal = (id) => {
    const item = externalItems.find(i => i.id === id)
    setExternalItems(externalItems.filter(i => i.id !== id))
    setItems([...items, item])
  }

  const checkAnswers = () => {
    const internalCorrect = internalItems.every(item => item.type === 'internal') && 
                           internalItems.length === 2
    const externalCorrect = externalItems.every(item => item.type === 'external') && 
                           externalItems.length === 2

    setAllCorrect(internalCorrect && externalCorrect)
    setShowFeedback(true)
  }

  const reset = () => {
    setItems([
      { id: 1, text: 'Strong brand reputation', type: 'internal', correct: true },
      { id: 2, text: 'Limited budget', type: 'internal', correct: true },
      { id: 3, text: 'New competitor entering market', type: 'external', correct: true },
      { id: 4, text: 'Growing customer demand', type: 'external', correct: true },
    ])
    setInternalItems([])
    setExternalItems([])
    setAllCorrect(false)
    setShowFeedback(false)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Internal vs External
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Try categorizing these items! Drag items from the left into the correct category.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Source Items */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
              Items to Sort
            </h3>
            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="p-4 bg-white rounded-lg border-2 border-gray-300 cursor-move hover:border-blue-500 hover:shadow-md transition-all hover:scale-105 active:opacity-50"
                >
                  <p className="text-gray-800 font-medium">{item.text}</p>
                </div>
              ))}
              {items.length === 0 && (
                <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg text-center">
                  <p className="text-green-600 font-semibold">✓ All items sorted!</p>
                </div>
              )}
            </div>
          </div>

          {/* Drop Zones */}
          <div className="space-y-8">
            {/* Internal Zone */}
            <div className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                Internal (You Control)
              </h3>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDropInternal}
                className="min-h-64 p-4 bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg transition-all hover:border-purple-500 hover:bg-purple-100"
              >
                <div className="space-y-2">
                  {internalItems.map(item => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg text-white font-medium flex justify-between items-center transition-all ${
                        item.type === 'internal'
                          ? 'bg-purple-600 border-2 border-purple-700'
                          : 'bg-red-500 border-2 border-red-600 animate-shake'
                      }`}
                    >
                      <span>{item.text}</span>
                      <button
                        onClick={() => handleRemoveInternal(item.id)}
                        className="ml-2 text-lg hover:scale-125 transition-transform"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {internalItems.length === 0 && (
                    <p className="text-purple-500 text-center py-8 text-sm font-medium">
                      Drop internal items here
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* External Zone */}
            <div className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                External (Beyond Your Control)
              </h3>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDropExternal}
                className="min-h-64 p-4 bg-orange-50 border-2 border-dashed border-orange-300 rounded-lg transition-all hover:border-orange-500 hover:bg-orange-100"
              >
                <div className="space-y-2">
                  {externalItems.map(item => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg text-white font-medium flex justify-between items-center transition-all ${
                        item.type === 'external'
                          ? 'bg-orange-600 border-2 border-orange-700'
                          : 'bg-red-500 border-2 border-red-600 animate-shake'
                      }`}
                    >
                      <span>{item.text}</span>
                      <button
                        onClick={() => handleRemoveExternal(item.id)}
                        className="ml-2 text-lg hover:scale-125 transition-transform"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {externalItems.length === 0 && (
                    <p className="text-orange-500 text-center py-8 text-sm font-medium">
                      Drop external items here
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback & Actions */}
          <div className={`transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Progress</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Sorted: {internalItems.length + externalItems.length}/4</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${((internalItems.length + externalItems.length) / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              {allCorrect && showFeedback && (
                <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg mb-4">
                  <p className="text-green-700 font-semibold">✓ Perfect! All items correctly sorted!</p>
                </div>
              )}

              {showFeedback && !allCorrect && items.length < 4 && (
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg mb-4">
                  <p className="text-red-700 font-semibold">⚠ Some items may be misplaced. Check your answers!</p>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={checkAnswers}
                  disabled={internalItems.length + externalItems.length === 0}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                    internalItems.length + externalItems.length > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Check Answers
                </button>
                <button
                  onClick={reset}
                  className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Reset
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                💡 Tip: You can remove items by clicking the × button
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
