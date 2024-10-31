'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShieldAlert, TrendingUp, Zap, Brain, Scale } from 'lucide-react'

const questions = [
  {
    question: "How do you typically view risk in prediction markets?",
    options: [
      "As something to be avoided at all costs",
      "As a necessary evil in some situations",
      "As a potential opportunity for growth",
      "As an exciting challenge to be embraced"
    ],
    icon: <ShieldAlert className="w-8 h-8 text-primary" />,
  },
  {
    question: "When faced with a low-probability, high-reward prediction, you usually:",
    options: [
      "Avoid it due to the high risk",
      "Carefully consider it, but often decide against it",
      "Thoroughly research it before making a decision",
      "Jump at the chance, believing in your ability to make it work"
    ],
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
  },
  {
    question: "How often do you participate in prediction markets?",
    options: [
      "Never, I'm just learning about them",
      "Occasionally, when I feel confident about an outcome",
      "Regularly, as part of my investment strategy",
      "Frequently, I'm always looking for new markets to enter"
    ],
    icon: <Zap className="w-8 h-8 text-primary" />,
  },
  {
    question: "When your prediction is incorrect, you typically:",
    options: [
      "Feel discouraged and avoid similar markets in the future",
      "Reflect on what went wrong, but are hesitant to try again",
      "Learn from the experience and adjust your strategy for next time",
      "See it as a valuable learning opportunity and immediately look for the next prediction to make"
    ],
    icon: <Brain className="w-8 h-8 text-primary" />,
  },
  {
    question: "How do you approach decision-making in prediction markets?",
    options: [
      "Avoid making predictions until you have all the information",
      "Make predictions cautiously, always choosing the safest option",
      "Weigh the potential risks and rewards before deciding",
      "Trust your instincts and make quick predictions"
    ],
    icon: <Scale className="w-8 h-8 text-primary" />,
  }
]

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const results = [
  {
    title: "The Curious Observer",
    description: "You're new to prediction markets and prefer to learn more before diving in. Janka's educational resources and community support can help you gain confidence.",
    recommendation: "Join our Telegram group to learn from experienced predictors and stay updated on Janka's development. Our community is welcoming and always ready to help newcomers understand the exciting world of prediction markets.",
    action: {
      text: "Join Janka's Telegram Community",
      onClick: () => window.open('https://t.me/+mrbJewOGK_ZiOTI1', '_blank')
    },
    focusSection: "investor-relations"
  },
  {
    title: "The Cautious Predictor",
    description: "You have a balanced approach to prediction markets, weighing risks and rewards carefully. Janka's advanced tools can help you refine your strategy and make more informed predictions.",
    recommendation: "Join our waitlist to be among the first to access Janka's powerful prediction market platform. You'll get early access to our risk assessment tools and educational resources, perfect for your thoughtful approach to predictions.",
    action: {
      text: "Join Janka's Waitlist",
      onClick: () => scrollToSection('waitlist-signup')
    },
    focusSection: "waitlist-signup"
  },
  {
    title: "The Strategic Opportunist",
    description: "You're enthusiastic about prediction markets and always looking for new opportunities. Janka's innovative features will help you maximize your potential and find the most promising markets.",
    recommendation: "Consider donating to support Janka's development and secure early access to our most advanced features. Your contribution will help us build cutting-edge prediction tools that align with your strategic approach.",
    action: {
      text: "Donate to Janka",
      onClick: () => scrollToSection('donation')
    },
    focusSection: "donation"
  },
  {
    title: "The Prediction Maven",
    description: "You're a seasoned predictor with a high risk tolerance and a keen eye for opportunities. Janka's cutting-edge platform is designed for experts like you who are pushing the boundaries of prediction markets.",
    recommendation: "Become a Janka VIP member by making a significant donation. You'll get exclusive access to beta features, direct input into our development roadmap, and the opportunity to shape the future of decentralized prediction markets.",
    action: {
      text: "Become a Janka VIP",
      onClick: () => {
        scrollToSection('donation');
        scrollToSection('governance');
      }
    },
    focusSection: ["donation", "governance"]
  }
]

export default function WaitlistQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(-1)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleStart = () => {
    setCurrentQuestion(0)
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0)
      setScore((totalScore / (questions.length * 3)) * 100)
      handleShowResults()
    }
  }

  const calculateResult = () => {
    const average = score / 25
    return results[Math.floor(average)]
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleShowResults = () => {
    setShowResults(true);
    const result = calculateResult();
    if (Array.isArray(result.focusSection)) {
      result.focusSection.forEach(section => scrollToSection(section));
    } else {
      scrollToSection(result.focusSection);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Janka Predictor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {currentQuestion === -1 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Discover Your Prediction Market Style</h2>
              <p className="mb-6">
                Take this quick quiz to find out how you approach prediction markets and get a personalized recommendation for engaging with Janka.
              </p>
              <Button onClick={handleStart} className="w-full">Begin Assessment</Button>
            </motion.div>
          )}
          {currentQuestion >= 0 && !showResults && (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                {questions[currentQuestion].icon}
                <h2 className="text-xl font-semibold ml-4">{questions[currentQuestion].question}</h2>
              </div>
              <RadioGroup className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      onClick={() => handleAnswer(index)}
                    />
                    <Label htmlFor={`option-${index}`} className="text-sm">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          )}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">Your Predictor Profile: {calculateResult().title}</h2>
              <p className="text-lg mb-6">{calculateResult().description}</p>
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Recommendation</h3>
                <p className="mb-4">{calculateResult().recommendation}</p>
                <Button className="w-full" onClick={calculateResult().action.onClick}>
                  {calculateResult().action.text}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter>
        {currentQuestion >= 0 && !showResults && (
          <div className="w-full">
            <Progress value={progress} className="w-full mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}