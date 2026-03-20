import { useState, useEffect } from 'react'

export default function ExampleSection() {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const swotData = {
    strength: [
      { text: 'Skilled tech team', tooltip: 'Has expertise in cutting-edge technologies' },
      { text: 'Strong data infrastructure', tooltip: 'Robust systems for data processing' }
    ],
    weakness: [
      { text: 'High upfront cost', tooltip: 'Significant initial investment required' },
      { text: 'Lack of employee training', tooltip: 'Team needs upskilling in AI tools' }
    ],
    opportunity: [
      { text: 'Increased efficiency', tooltip: 'Automate repetitive tasks and save time' },
      { text: 'New product innovation', tooltip: 'Develop AI-powered product features' }
    ],
    threat: [
      { text: 'Competitors adopting faster', tooltip: 'May lose market advantage quickly' },
      { text: 'Regulatory uncertainty', tooltip: 'AI regulations still evolving' }
    ]
  }

  const renderCell = (title, type, items) => (
    <div className={`p-6 rounded-lg h-full transition-all duration-300 ${
      type === 'strength' ? 'bg-green-50 border-l-4 border-green-500' : 
      type === 'weakness' ? 'bg-red-50 border-l-4 border-red-500' :
      type === 'opportunity' ? 'bg-blue-50 border-l-4 border-blue-500' :
      'bg-orange-50 border-l-4 border-orange-500'
    }`}>
      <h3 className={`text-xl font-bold mb-4 ${
        type === 'strength' ? 'text-green-700' :
        type === 'weakness' ? 'text-red-700' :
        type === 'opportunity' ? 'text-blue-700' :
        'text-orange-700'
      }`}>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative group cursor-help flex items-start"
            onMouseEnter={() => setHoveredItem(`${type}-${idx}`)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span className={`mr-3 font-bold ${
              type === 'strength' ? 'text-green-600' :
              type === 'weakness' ? 'text-red-600' :
              type === 'opportunity' ? 'text-blue-600' :
              'text-orange-600'
            }`}>•</span>
            <span className="text-gray-800 font-medium group-hover:underline transition-all">
              {item.text}
            </span>
            {hoveredItem === `${type}-${idx}` && (
              <div className="absolute left-0 -bottom-10 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 animate-fadeIn">
                {item.tooltip}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Example: Adopting AI in a Company
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Here's a real-world example of how to apply SWOT analysis to a business decision. Hover over items to learn more.
          </p>
        </div>

        {/* 2x2 SWOT Grid */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Top Left - Strengths */}
          {renderCell('💪 Strengths (Internal+)', 'strength', swotData.strength)}

          {/* Top Right - Weaknesses */}
          {renderCell('📉 Weaknesses (Internal-)', 'weakness', swotData.weakness)}

          {/* Bottom Left - Opportunities */}
          {renderCell('📈 Opportunities (External+)', 'opportunity', swotData.opportunity)}

          {/* Bottom Right - Threats */}
          {renderCell('⚠️ Threats (External-)', 'threat', swotData.threat)}
        </div>

        {/* Strategic Insights */}
        <div className={`mt-16 grid md:grid-cols-2 gap-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* What This Means */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4">📊 Strategic Analysis</h3>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">→</span>
                <span><strong>Leverage Strengths:</strong> Use your skilled team to lead the AI adoption</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">→</span>
                <span><strong>Address Weaknesses:</strong> Invest in employee training to reduce skill gaps</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">→</span>
                <span><strong>Seize Opportunities:</strong> First-mover advantage in new AI products</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">→</span>
                <span><strong>Mitigate Threats:</strong> Monitor competitors and regulatory changes</span>
              </li>
            </ul>
          </div>

          {/* Decision Framework */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-purple-900 mb-4">🎯 Decision Framework</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-purple-700 mb-2">✓ GO Factors</p>
                <p className="text-sm text-gray-700">Strong team + clear opportunities + cost management = Proceed with caution but proceed</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-purple-700 mb-2">⚠ CAUTION Factors</p>
                <p className="text-sm text-gray-700">High costs + skill gaps + competitor pressure require careful planning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Hint */}
        <div className="mt-12 text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-600">
            <span className="text-lg">💡</span> Hover over any item in the SWOT grid to see detailed tooltips explaining each factor
          </p>
        </div>
      </div>
    </section>
  )
}
