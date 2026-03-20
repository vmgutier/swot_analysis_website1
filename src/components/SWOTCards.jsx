import { useEffect, useState } from 'react'

export default function SWOTCards() {
  const [isVisible, setIsVisible] = useState(false)
  const [openCard, setOpenCard] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const cards = [
    {
      type: 'Strengths',
      title: 'Strengths',
      description: 'What you do well (internal advantages)',
      icon: '💪',
      color: 'swot-strength',
      bgColor: 'bg-green-50',
      borderColor: 'border-l-4 border-swot-strength',
      examples: [
        'Strong brand reputation',
        'Skilled and experienced team',
        'Unique resources and assets'
      ]
    },
    {
      type: 'Weaknesses',
      title: 'Weaknesses',
      description: 'Where you struggle (internal limitations)',
      icon: '📉',
      color: 'swot-weakness',
      bgColor: 'bg-red-50',
      borderColor: 'border-l-4 border-swot-weakness',
      examples: [
        'Limited budget and resources',
        'Lack of key expertise',
        'Inefficient processes'
      ]
    },
    {
      type: 'Opportunities',
      title: 'Opportunities',
      description: 'External chances to grow',
      icon: '📈',
      color: 'swot-opportunity',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-4 border-swot-opportunity',
      examples: [
        'Growing market demand',
        'New technology adoption',
        'Strategic partnerships'
      ]
    },
    {
      type: 'Threats',
      title: 'Threats',
      description: 'External risks or challenges',
      icon: '⚠️',
      color: 'swot-threat',
      bgColor: 'bg-orange-50',
      borderColor: 'border-l-4 border-swot-threat',
      examples: [
        'New market competitors',
        'Economic downturn',
        'Regulatory changes'
      ]
    }
  ]

  const handleCardClick = (index) => {
    setOpenCard(openCard === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            What is SWOT?
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            SWOT is a strategic framework that helps analyze internal and external factors affecting your organization or project.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible
                  ? `opacity-100 translate-y-0 delay-${(index + 1) * 100}`
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 100}ms` : '0ms'
              }}
            >
              <div className={`${card.bgColor} ${card.borderColor} rounded-lg p-8 cursor-pointer transition-all duration-300 ${
                openCard === index ? 'shadow-xl' : 'hover:shadow-xl hover:scale-105'
              }`}>
                {/* Icon */}
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4">
                  {card.description}
                </p>

                {/* Learn more link - clickable */}
                <button
                  onClick={() => handleCardClick(index)}
                  className="flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 group-hover:translate-x-2 transition-all duration-300 bg-none border-none p-0 cursor-pointer"
                >
                  <span>Learn more</span>
                  <span className={`ml-2 transition-transform duration-300 inline-block ${
                    openCard === index ? 'rotate-90' : ''
                  }`}>→</span>
                </button>

                {/* Expandable Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openCard === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="border-t border-gray-300 pt-4">
                    <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Examples:</p>
                    <ul className="space-y-2">
                      {card.examples.map((example, exIdx) => (
                        <li
                          key={exIdx}
                          className="text-sm text-gray-700 flex items-start animate-fadeIn"
                          style={{ animationDelay: `${exIdx * 50}ms` }}
                        >
                          <span className="mr-2 font-bold text-gray-500">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Insight */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Key Insight</h4>
          <p className="text-gray-700 leading-relaxed">
            <strong>Internal factors</strong> (Strengths & Weaknesses) are within your control, while <strong>External factors</strong> (Opportunities & Threats) are not. The value of SWOT is understanding how to leverage your strengths against external opportunities while minimizing weaknesses in the face of threats.
          </p>
        </div>
      </div>
    </section>
  )
}
