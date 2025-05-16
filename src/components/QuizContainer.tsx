
import React, { useState, useEffect } from 'react';
import { quizQuestions } from '@/data/quizQuestions';
import QuizQuestion from './QuizQuestion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const QuizContainer: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const { toast } = useToast();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = (completedQuestions.length / quizQuestions.length) * 100;

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      try {
        const { completed, current } = JSON.parse(savedProgress);
        setCompletedQuestions(completed);
        setCurrentQuestionIndex(current);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('quizProgress', JSON.stringify({
      completed: completedQuestions,
      current: currentQuestionIndex
    }));
  }, [completedQuestions, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (!completedQuestions.includes(currentQuestionIndex)) {
      setCompletedQuestions([...completedQuestions, currentQuestionIndex]);
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      toast({
        title: "Quiz Completed!",
        description: `You've completed all ${quizQuestions.length} questions.`,
      });
      // Circle back to the first question
      setCurrentQuestionIndex(0);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const resetProgress = () => {
    if (confirm("Are you sure you want to reset your progress?")) {
      setCompletedQuestions([]);
      setCurrentQuestionIndex(0);
      localStorage.removeItem('quizProgress');
      toast({
        title: "Progress Reset",
        description: "Your quiz progress has been reset.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-quiz-primary to-quiz-secondary text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Web Coding Quiz</h1>
          <p className="text-lg opacity-90">Test your HTML, CSS, and JavaScript skills</p>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-grow">
              <Progress value={progress} className="h-2" />
            </div>
            <span className="text-sm whitespace-nowrap">
              {completedQuestions.length} / {quizQuestions.length} completed
            </span>
          </div>
          
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {quizQuestions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestionIndex === index ? "default" : completedQuestions.includes(index) ? "outline" : "secondary"}
                size="sm"
                className={`min-w-[40px] ${
                  completedQuestions.includes(index) && currentQuestionIndex !== index ? "bg-white text-primary" : ""
                }`}
                onClick={() => handleJumpToQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
            
            <Button 
              variant="outline"
              size="sm" 
              className="whitespace-nowrap bg-white/10"
              onClick={resetProgress}
            >
              Reset Progress
            </Button>
          </div>
        </div>
      </header>
      
      <main>
        <QuizQuestion 
          question={currentQuestion} 
          onNextQuestion={handleNextQuestion}
        />
        
        <div className="max-w-6xl mx-auto px-4 pb-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous Question
          </Button>
          
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex === quizQuestions.length - 1 ? "Back to Start" : "Skip to Next Question"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default QuizContainer;
