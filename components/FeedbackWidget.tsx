'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { showToast } from '@/components/ui/custom-toast'
import Image from 'next/image'

const feedbackQuestions = [
  {
    question: "What's your first impression of Janka?",
    options: [
      "Very Interesting",
      "Somewhat Interesting",
      "Neutral",
      "Not Interesting"
    ],
    allowCustom: false
  },
  {
    question: "Which feature interests you the most?",
    options: [
      "Prediction Markets",
      "Blockchain Integration",
      "User Interface",
      "Smart Contracts"
    ],
    allowCustom: true
  },
  {
    question: "What needs improvement?",
    options: [
      "Clearer Explanations",
      "More Features",
      "Better Design",
      "More Examples"
    ],
    allowCustom: true
  }
]

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(-1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [customAnswer, setCustomAnswer] = useState("")
  const [showDemoMessage, setShowDemoMessage] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [finalCustomFeedback, setFinalCustomFeedback] = useState("")

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    if (!hasSeenWelcome) {
      setIsOpen(true)
      localStorage.setItem('hasSeenWelcome', 'true')
    } else {
      setIsOpen(false)
    }
  }, [])

  const handleStart = () => {
    setCurrentQuestion(0)
    setShowDemoMessage(false)
  }

  const handleAnswer = async (answer: string) => {
    const currentAnswers = {
      ...answers,
      [currentQuestion]: answer
    }
    setAnswers(currentAnswers)

    if (currentQuestion < feedbackQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else if (!feedbackQuestions[currentQuestion].allowCustom) {
      await submitFeedback(currentAnswers)
    }
  }

  const submitFeedback = async (currentAnswers: Record<number, string>) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Prepare feedback data
    const feedbackData = Object.entries(currentAnswers).map(([questionId, answer]) => ({
      questionId: parseInt(questionId),
      question: feedbackQuestions[parseInt(questionId)].question,
      answer,
      customFeedback: finalCustomFeedback
    }))

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: feedbackData }),
      })

      if (!response.ok) throw new Error('Failed to submit feedback')

      setSubmitStatus('success')
      setTimeout(() => {
        setIsOpen(false)
        setCurrentQuestion(-1)
        setAnswers({})
        setFinalCustomFeedback('')
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-row-reverse items-end gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="relative w-12 h-12 flex items-center justify-center"
      >
        <Image
          src="/Jankabot.svg"
          alt="Janka Bot"
          width={48}
          height={48}
          className="rounded-full shadow-lg"
          priority
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Card className="w-80 bg-[#ffb0dc]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  {currentQuestion === -1 ? "Welcome to Janka Demo" : "Quick Feedback"}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {currentQuestion === -1 ? (
                  showDemoMessage ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This is a demo version of Janka. We&apos;d love to hear your thoughts!
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Help us improve Janka by sharing your feedback.
                    </p>
                  )
                ) : (
                  <div>
                    <p className="mb-4">{feedbackQuestions[currentQuestion].question}</p>
                    <RadioGroup className="space-y-2">
                      {feedbackQuestions[currentQuestion].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}`}
                            onClick={() => handleAnswer(option)}
                          />
                          <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    {currentQuestion === feedbackQuestions.length - 1 && (
                      <div className="mt-4">
                        <Textarea
                          placeholder="Any additional feedback?"
                          value={finalCustomFeedback}
                          onChange={(e) => setFinalCustomFeedback(e.target.value)}
                          className="mb-2"
                        />
                        <Button 
                          onClick={() => submitFeedback(answers)}
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Submit Feedback'
                          )}
                        </Button>
                        
                        <AnimatePresence>
                          {submitStatus !== 'idle' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className={`mt-2 p-2 rounded text-center ${
                                submitStatus === 'success' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {submitStatus === 'success' 
                                ? 'Thank you for your feedback!' 
                                : 'Failed to submit feedback. Please try again.'}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              {currentQuestion === -1 && (
                <CardFooter>
                  <Button onClick={handleStart} className="w-full">
                    {showDemoMessage ? "Got it" : "Start Feedback"}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 