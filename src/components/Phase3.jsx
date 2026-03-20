import { useEffect, useMemo, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const statusSteps = [
  { text: 'Consulting the AI Strategist...', duration: 500 },
  { text: 'Analyzing your SWOT factors...', duration: 1000 },
  { text: 'Drafting personalized action plan...', duration: 1000 }
]

const formatList = (items) => items.map((item) => `- ${item}`).join('\n')

const renderMarkdown = (text) => {
  const lines = text.split('\n')
  let listOpen = false

  return lines.map((line, idx) => {
    if (!line.trim()) {
      if (listOpen) {
        listOpen = false
        return <div key={idx} className="h-2" />
      }
      return <div key={idx} className="h-2" />
    }

    if (line.startsWith('- ')) {
      if (!listOpen) {
        listOpen = true
      }
      return (
        <p key={idx} className="text-gray-700 text-sm ml-4 list-disc list-inside">
          {line.replace('- ', '')}
        </p>
      )
    }

    if (line.startsWith('## ')) {
      return (
        <h3 key={idx} className="text-xl font-bold text-gray-900 mt-4 mb-2">
          {line.replace('## ', '')}
        </h3>
      )
    }

    if (line.startsWith('# ')) {
      return (
        <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-4 mb-2">
          {line.replace('# ', '')}
        </h2>
      )
    }

    return (
      <p key={idx} className="text-gray-700 text-sm mb-1">
        {line}
      </p>
    )
  })
}

export default function Phase3({ analysisData, onStartOver }) {
  const [statusIndex, setStatusIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [reportText, setReportText] = useState('')
  const [typedText, setTypedText] = useState('')
  const [steps, setSteps] = useState('pending') // pending, typing, ready

  const problem = analysisData?.problem ?? ''
  const swot = analysisData?.swot ?? { strengths: [], weaknesses: [], opportunities: [], threats: [] }

  useEffect(() => {
    if (!loading) return

    setStatusIndex(0)
    const timers = []
    let elapsed = 0

    statusSteps.forEach((step, idx) => {
      const timer = setTimeout(() => {
        setStatusIndex(idx)
      }, elapsed)
      timers.push(timer)
      elapsed += step.duration
    })

    const endTimer = setTimeout(() => {
      const finalText = generateMockReport()
      setReportText(finalText)
      setSteps('typing')
      setLoading(false)
    }, elapsed)

    timers.push(endTimer)

    return () => timers.forEach(clearTimeout)
  }, [loading])

  const generateMockReport = () => {
    return `## Strategic Roadmap for ${problem}

### Step 1: Leverage Internal Strengths
Based on your identified strengths, we recommend doubling down on your core competencies to gain immediate market traction.

### Step 2: Mitigate Weaknesses & Threats
To protect the organization, we suggest a defensive posture regarding your top threats while internally addressing the primary weaknesses you listed.

### Step 3: Capitalize on Opportunities
The external environment shows high potential. We recommend a 6-month growth plan focused on the opportunities you've identified.

---
### Your SWOT Summary
**Strengths:** ${swot.strengths.length ? swot.strengths.join(', ') : 'None provided'}

**Weaknesses:** ${swot.weaknesses.length ? swot.weaknesses.join(', ') : 'None provided'}

**Opportunities:** ${swot.opportunities.length ? swot.opportunities.join(', ') : 'None provided'}

**Threats:** ${swot.threats.length ? swot.threats.join(', ') : 'None provided'}
`;
  }

  const callAI = async () => {
    setLoading(true)
    setSteps('pending')
    setReportText('')
    setTypedText('')
  }

  useEffect(() => {
    if (!analysisData) return
    callAI()
  }, [analysisData])

  useEffect(() => {
    if (steps !== 'typing') return

    setTypedText('')
    let currentIndex = 0
    const total = reportText.length

    const typeInterval = setInterval(() => {
      currentIndex += 1
      setTypedText(reportText.slice(0, currentIndex))

      if (currentIndex >= total) {
        clearInterval(typeInterval)
        setSteps('ready')
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [steps, reportText])

  const handleExportPDF = async () => {
    const element = document.getElementById('phase3-final-report')
    if (!element) return

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: true })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'pt', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pageWidth - 80
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // White background base
      pdf.setFillColor(255, 255, 255)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      // Professional header
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(20)
      pdf.setTextColor(30, 30, 30)
      pdf.text('SWOT STRATEGIC ANALYSIS', 40, 50)

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(12)
      pdf.text(`Problem Statement: ${problem}`, 40, 70, { maxWidth: pageWidth - 80 })

      // Upper content image
      let position = 90
      pdf.addImage(imgData, 'PNG', 40, position, imgWidth, imgHeight)

      if (position + imgHeight > pageHeight) {
        let heightLeft = position + imgHeight - pageHeight
        while (heightLeft > 0) {
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 40, -pageHeight + 90 + heightLeft, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }
      }

      pdf.save('SWOT-Strategic-Report.pdf')
    } catch (err) {
      console.error('PDF export failed', err)
    }
  }

  if (!analysisData) {
    return (
      <div className="py-20 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">No analysis data available</h2>
          <p className="mt-3 text-gray-600">Please complete Phase 2 first.</p>
          <button
            onClick={onStartOver}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 animate-fade-in" id="phase3-final-report">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Strategic Analysis Report</h1>
            <p className="text-sm text-gray-600 mt-1">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={callAI}
              disabled={loading}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${loading ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {loading ? 'Analyzing...' : 'Generate Plan'}
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Export as PDF
            </button>
            <button
              onClick={() => {
                window.localStorage.clear()
                onStartOver()
              }}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              New Analysis
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center border border-purple-200 mb-6">
            <div className="mx-auto w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p className="text-purple-700 font-semibold">{statusSteps[statusIndex]?.text}</p>
          </div>
        ) : (steps === 'typing' || steps === 'ready') && (
          <>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Statement</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{problem}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {['strengths','weaknesses','opportunities','threats'].map((key) => {
                const title = key.charAt(0).toUpperCase() + key.slice(1)
                const colors = {
                  strengths: 'bg-green-50 border-green-300 text-green-700',
                  weaknesses: 'bg-red-50 border-red-300 text-red-700',
                  opportunities: 'bg-blue-50 border-blue-300 text-blue-700',
                  threats: 'bg-orange-50 border-orange-300 text-orange-700'
                }

                return (
                  <div key={key} className={`rounded-xl border p-4 ${colors[key]} shadow-sm`}>
                    <h3 className="font-semibold mb-3">{title}</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {swot[key].length ? swot[key].map((item, idx) => <li key={idx}>{item}</li>) : <li className="text-gray-500 italic">No items</li>}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">AI Action Plan</h2>
              <div className="text-gray-700 leading-relaxed space-y-2 min-h-[160px]">
                {renderMarkdown(steps === 'typing' ? typedText : reportText)}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
