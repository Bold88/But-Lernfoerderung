'use client'

import { useState, useEffect } from 'react'

interface ButCheckProps {
  onComplete: (answers: Record<string, boolean>) => void
}

export default function ButCheck({ onComplete }: ButCheckProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)

  const questions = [
    {
      id: 'jobcenter',
      question: 'Erhält Ihre Familie Unterstützung vom Jobcenter?',
      yesLabel: 'Ja, wir beziehen Unterstützung vom Jobcenter',
      noLabel: 'Nein, wir beziehen keine Unterstützung vom Jobcenter',
      icon: '💼',
      yesIcon: '✅',
      noIcon: '❌',
    },
    {
      id: 'sozialamt',
      question: 'Erhält Ihre Familie Leistungen vom Sozialamt oder der Wohngeldstelle?',
      yesLabel: 'Ja, wir erhalten Leistungen vom Sozialamt oder der Wohngeldstelle',
      noLabel: 'Nein, wir erhalten keine Leistungen vom Sozialamt oder der Wohngeldstelle',
      icon: '🏛️',
      yesIcon: '✅',
      noIcon: '❌',
    },
    {
      id: 'kinderzuschlag',
      question: 'Erhält Ihre Familie zusätzlich zum Kindergeld einen Kinderzuschlag?',
      yesLabel: 'Ja, wir erhalten einen Kinderzuschlag',
      noLabel: 'Nein, wir erhalten keinen Kinderzuschlag',
      icon: '👨‍👩‍👧‍👦',
      yesIcon: '✅',
      noIcon: '❌',
    },
    {
      id: 'asylbLG',
      question: 'Bezieht Ihre Familie Leistungen über das Asylbewerberleistungsgesetz?',
      yesLabel: 'Ja, wir beziehen Leistungen über das Asylbewerberleistungsgesetz',
      noLabel: 'Nein, wir beziehen keine Leistungen über das Asylbewerberleistungsgesetz',
      icon: '🤝',
      yesIcon: '✅',
      noIcon: '❌',
    },
  ]

  useEffect(() => {
    setSelectedAnswer(answers[questions[currentQuestion].id] ?? null)
  }, [currentQuestion, answers])

  const handleAnswer = (answer: boolean) => {
    if (isAnimating) return
    
    setSelectedAnswer(answer)
    setIsAnimating(true)
    
    const questionId = questions[currentQuestion].id
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setIsAnimating(false)
      } else {
        onComplete(newAnswers)
      }
    }, 500)
  }

  const handlePrev = () => {
    if (currentQuestion > 0 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleNext = () => {
    if (selectedAnswer !== null && !isAnimating) {
      const questionId = questions[currentQuestion].id
      if (currentQuestion < questions.length - 1) {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1)
          setIsAnimating(false)
        }, 300)
      } else {
        onComplete(answers)
      }
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  return (
    <div className="but-check-spectacular">
      {/* Header mit Progress */}
      <div className="but-check-header">
        <div className="but-check-top">
          <div className="but-check-badge">
            <span className="badge-icon">🎯</span>
            <span>Kostenlose Anspruchsprüfung</span>
          </div>
          <div className="but-check-counter">
            Frage {currentQuestion + 1} von {questions.length}
          </div>
        </div>
        
        {/* Spektakulärer Progress Bar */}
        <div className="but-progress-spectacular">
          <div className="but-progress-track">
            <div 
              className="but-progress-fill" 
              style={{ width: `${progress}%` }}
            >
              <div className="progress-glow"></div>
            </div>
          </div>
          <div className="but-progress-steps">
            {questions.map((_, index) => (
              <div 
                key={index}
                className={`progress-step ${index <= currentQuestion ? 'active' : ''} ${index === currentQuestion ? 'current' : ''}`}
              >
                <div className="step-dot"></div>
                {index < questions.length - 1 && <div className="step-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question Card mit Animation */}
      <div className={`but-question-card ${isAnimating ? 'animating' : ''}`}>
        <div className="question-icon-wrapper">
          <div className="question-icon">{currentQ.icon}</div>
          <div className="icon-ring"></div>
        </div>
        
        <h3 className="question-title">
          {currentQ.question}
        </h3>
        
        <p className="question-subtitle">
          Wählen Sie die Antwort, die auf Ihre Situation zutrifft
        </p>

        {/* Spektakuläre Answer Buttons */}
        <div className="but-answer-options-spectacular">
          <button 
            onClick={() => handleAnswer(true)}
            className={`answer-button answer-yes ${selectedAnswer === true ? 'selected' : ''} ${isAnimating ? 'disabled' : ''}`}
            disabled={isAnimating}
          >
            <div className="answer-icon-wrapper">
              <span className="answer-icon-large">{currentQ.yesIcon}</span>
            </div>
            <div className="answer-content">
              <div className="answer-label">Ja</div>
              <div className="answer-description">{currentQ.yesLabel}</div>
            </div>
            {selectedAnswer === true && (
              <div className="answer-checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
            <div className="answer-glow"></div>
          </button>

          <button 
            onClick={() => handleAnswer(false)}
            className={`answer-button answer-no ${selectedAnswer === false ? 'selected' : ''} ${isAnimating ? 'disabled' : ''}`}
            disabled={isAnimating}
          >
            <div className="answer-icon-wrapper">
              <span className="answer-icon-large">{currentQ.noIcon}</span>
            </div>
            <div className="answer-content">
              <div className="answer-label">Nein</div>
              <div className="answer-description">{currentQ.noLabel}</div>
            </div>
            {selectedAnswer === false && (
              <div className="answer-checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
            <div className="answer-glow"></div>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="but-navigation">
          {currentQuestion > 0 && (
            <button 
              onClick={handlePrev}
              className="nav-button nav-prev"
              disabled={isAnimating}
            >
              <span className="nav-icon">←</span>
              <span>Zurück</span>
            </button>
          )}
          
          {selectedAnswer !== null && (
            <button 
              onClick={handleNext}
              className="nav-button nav-next"
              disabled={isAnimating}
            >
              <span>{currentQuestion < questions.length - 1 ? 'Weiter' : 'Abschließen'}</span>
              <span className="nav-icon">→</span>
            </button>
          )}
        </div>

        {/* Motivierender Text */}
        <div className="but-motivation">
          <p>
            {currentQuestion === 0 && "🎉 Los geht's! Nur noch " + (questions.length - 1) + " Fragen"}
            {currentQuestion === 1 && "💪 Weiter so! Noch " + (questions.length - 2) + " Fragen"}
            {currentQuestion === 2 && "🔥 Fast geschafft! Noch " + (questions.length - 3) + " Frage"}
            {currentQuestion === 3 && "✨ Letzte Frage! Sie sind fast fertig"}
          </p>
        </div>
      </div>
    </div>
  )
}
