# Phase 2 Integration Guide

## Quick Start

Phase 2 is fully integrated into the SWOT Analysis App. Here's how to navigate:

### Accessing Phase 2

1. **Start the app**: `npm run dev` at http://localhost:3000
2. **Enter a challenge**: Type in the hero section text field
3. **Click "Start Learning"**: Unlock the educational content
4. **Scroll through Phase 1**: Learn about SWOT, practice drag-and-drop
5. **Click "Start Your Analysis"**: Transition to Phase 2

## Phase 2 Workflow

### Step 1: Problem Statement
```
Hero Input (Challenge) → Persists → Phase 2 Pre-filled
                                   ↓
                    User can edit or keep as-is
                                   ↓
                            Click "Next"
```

### Step 2: SWOT Input Grid
```
Problem Statement displayed at top
        ↓
    2×2 Grid
    ├─ Strengths (Green)
    ├─ Weaknesses (Red)
    ├─ Opportunities (Blue)
    └─ Threats (Orange)
        ↓
    Add items to each
        ↓
    All categories ≥1 item?
        ├─ NO: "Generate Action Plan" button disabled
        └─ YES: Button enabled → triggers onComplete
```

## File Structure

```
src/
├── App.jsx                    # Main app with phase management
├── components/
│   ├── Phase2.jsx            # Phase 2 container
│   ├── HeroSection.jsx       # Challenge input
│   ├── SWOTCards.jsx         # Educational cards
│   ├── DragDropSection.jsx   # Practice activity
│   ├── ExampleSection.jsx    # SWOT example
│   ├── CTASection.jsx        # Transition button
│   └── phase2/              # Phase 2 sub-components
│       ├── ProgressBar.jsx  # Step progress visual
│       ├── ProblemStatement.jsx  # Step 1 form
│       └── SWOTInputGrid.jsx    # Step 2 matrix
└── ...
```

## State Management

### App-Level State (App.jsx)
```javascript
const [challenge, setChallenge] = useState('')        // Phase 1 input
const [currentPhase, setCurrentPhase] = useState(1)   // Phase switcher
const [swotAnalysis, setSwotAnalysis] = useState(null) // Save Phase 2 output
```

### Phase 2-Level State (Phase2.jsx)
```javascript
const [currentStep, setCurrentStep] = useState(1)     // Step 1 or 2
const [problemStatement, setProblemStatement] = useState(initialChallenge)
const [swotData, setSWOTData] = useState({
  strengths: [],
  weaknesses: [],
  opportunities: [],
  threats: []
})
```

## Navigation

### Between Phases

**Phase 1 → Phase 2**:
```javascript
// In CTASection
<button onClick={onStartAnalysis}>Start Your Analysis →</button>

// In App.jsx
const handleStartAnalysis = () => {
  setCurrentPhase(2)
}
```

**Phase 2 → Phase 1**:
```javascript
// Click navbar logo or back button
onClick={handleBackToPhase1}

// In App.jsx
const handleBackToPhase1 = () => {
  setCurrentPhase(1)
}
```

### Within Phase 2 Steps

**Step 1 → Step 2**:
```javascript
// In ProblemStatement.jsx
<button onClick={() => handleProblemSubmit(problem)}>
  Next: Analyze SWOT →
</button>

// In Phase2.jsx
const handleProblemSubmit = (problem) => {
  setProblemStatement(problem)
  setCurrentStep(2)
}
```

**Step 2 → Step 1**:
```javascript
// In SWOTInputGrid.jsx
<button onClick={onBack}>← Back to Problem</button>

// In Phase2.jsx
const handleBackToProblem = () => {
  setCurrentStep(1)
}
```

## Data Flow

### Challenge Persistence

```
Hero Input
    ↓ challenge state
App.jsx (challenge prop)
    ↓
Phase2.jsx (initialChallenge prop)
    ↓
ProblemStatement.jsx (initialValue prop)
    ↓ Can be edited or confirmed
    ↓
SWOTInputGrid.jsx (displayed as reference)
```

### SWOT Data Capture

```
User adds items in SWOTInputGrid
    ↓ onAddItem callback
Phase2.jsx updates swotData state
    ↓ Button enables when complete
    ↓ User clicks "Generate Action Plan"
    ↓ onGenerateActionPlan triggers
    ↓ onComplete callback fires
    ↓
App.jsx receives:
{
  problem: "User's challenge",
  swot: {
    strengths: [...],
    weaknesses: [...],
    opportunities: [...],
    threats: [...]
  }
}
```

## Component Props

### Phase2.jsx
```javascript
<Phase2 
  initialChallenge={challenge}      // From Phase 1
  onComplete={handlePhase2Complete} // Fires when done
/>
```

### ProblemStatement.jsx
```javascript
<ProblemStatement 
  initialValue={problemStatement}   // Pre-filled text
  onSubmit={handleProblemSubmit}   // Triggers Step 2
/>
```

### SWOTInputGrid.jsx
```javascript
<SWOTInputGrid
  problemStatement={problemStatement}      // Display at top
  swotData={swotData}                     // Current items
  onAddItem={handleAddItem}               // Add item callback
  onDeleteItem={handleDeleteItem}         // Remove item callback
  onBack={handleBackToProblem}            // Back button action
  onGenerateActionPlan={handleGenerateActionPlan}  // Submit callback
  isComplete={isPhase2Complete}           // Button enabled state
/>
```

## Callbacks & Handlers

### handleStartAnalysis
```javascript
Triggered by: "Start Your Analysis" button in CTASection
Action: Sets currentPhase = 2
Result: User sees Phase 2 UI
```

### handleProblemSubmit
```javascript
Triggered by: "Next: Analyze SWOT" button
Action: Saves problem statement, moves to Step 2
Params: problem (string)
```

### handleAddItem
```javascript
Triggered by: "Add" button or Enter key
Action: Adds item to SWOT category
Params: category (string), item (string)
```

### handleDeleteItem
```javascript
Triggered by: × button on item
Action: Removes item from SWOT category
Params: category (string), index (number)
```

### handleGenerateActionPlan
```javascript
Triggered by: "Generate Action Plan" button (when enabled)
Action: Calls onComplete with analysis data
Result: Prepares data for Phase 3
```

## Key Features

### 1. Progress Tracking
- Visual progress bar shows steps (1, 2, 3)
- Current step highlighted in color
- Completed steps show checkmark

### 2. Input Validation
- Problem statement required (non-empty)
- All 4 SWOT categories need ≥1 item
- Clear error/warning messages

### 3. User Feedback
- Character count in problem statement
- Progress bars for each SWOT category
- Item count badges
- Status checkmarks (✓ or ○)

### 4. Animations
- Fade-in on component load
- Slide-up section entrance
- Staggered item animations
- Smooth transitions (300ms)

### 5. Responsive Design
- **Mobile**: Vertical stacking, optimized spacing
- **Tablet**: 2-column layout
- **Desktop**: Full 2×2 grid

## Customization Points

### Add Required items for Phase 2 Completion
File: `src/components/Phase2.jsx`
```javascript
const isPhase2Complete = 
  swotData.strengths.length >= 1 &&  // Change 1 to 2, 3, etc.
  swotData.weaknesses.length >= 1 &&
  swotData.opportunities.length >= 1 &&
  swotData.threats.length >= 1
```

### Change Colors
File: `src/components/phase2/SWOTInputGrid.jsx`
```javascript
const swotCategories = [
  {
    // ...
    bgColor: 'bg-green-50',        // Change background
    borderColor: 'border-green-300', // Change border
    buttonColor: 'bg-green-600 hover:bg-green-700'  // Change button
  }
]
```

### Modify SWOT Categories
Add new category to `swotCategories` array in SWOTInputGrid.jsx and Phase2.jsx state

### Change Button Labels
Search component files for text and update:
- "Next: Analyze SWOT" in ProblemStatement.jsx
- "Generate Action Plan" in SWOTInputGrid.jsx
- "Back to Problem" in SWOTInputGrid.jsx

## Testing

### Automated Testing Points

- [ ] Initial challenge from Phase 1 persists in Phase 2
- [ ] Problem statement can be edited
- [ ] Items can be added to each SWOT category
- [ ] Items can be deleted
- [ ] "Generate Action Plan" button disabled until all categories have items
- [ ] Navigation between steps works
- [ ] Back button returns to Phase 1 properly
- [ ] Responsive layout works on all screen sizes

### Manual Testing Workflow

1. **Test Challenge Persistence**:
   - Enter challenge: "Expand to new market"
   - Click "Start Learning"
   - Scroll to bottom, click "Start Your Analysis"
   - Verify challenge pre-fills in Phase 2

2. **Test Problem Statement Edit**:
   - Modify the problem statement text
   - Click "Next: Analyze SWOT"
   - Verify modified text appears at top of SWOT grid

3. **Test SWOT Input**:
   - Add items: "Skilled team" to Strengths
   - Add items: "Limited budget" to Weaknesses
   - Add items: "Growing market" to Opportunities
   - Add items: "New competitors" to Threats
   - Watch progress bars update
   - Verify "Generate Action Plan" button becomes enabled

4. **Test Item Deletion**:
   - Click × on an item
   - Verify item removed
   - Watch button disable if any category becomes empty

5. **Test Navigation**:
   - Click "Back to Problem"
   - Verify Step 1 reappears
   - Data should be preserved (check if needed)
   - Click "Next" again
   - Verify Step 2 returns

## Future Integration (Phase 3)

When Phase 3 (Report Generation) is built:

```javascript
// In App.jsx
const handlePhase2Complete = (analysisData) => {
  setSwotAnalysis(analysisData)
  setCurrentPhase(3)  // Transition to Phase 3
}

// Phase 3 will receive
<Phase3 analysis={swotAnalysis} />
```

## Troubleshooting

### App shows blank page
- Check browser console for errors
- Ensure all imports in App.jsx are correct
- Verify `npm run dev` is still running

### Buttons don't respond
- Check browser console for JavaScript errors
- Verify onclick handlers are properly defined
- Test with simpler click event first

### Phase 2 doesn't load
- Check that Phase2.jsx import is in App.jsx
- Verify phase2/ directory has all 3 sub-components
- Check state management in App.jsx

### Data not persisting
- Currently stores in React state only (in-session)
- To persist across page reloads, implement localStorage
- Refer to PHASE2_DOCUMENTATION.md for code example

---

**Phase 2 is production-ready and fully integrated!**
Test it now at http://localhost:3000
