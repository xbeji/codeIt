
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { QuizQuestion as QuizQuestionType } from '@/data/quizQuestions';
import CodeEditor from './CodeEditor';
import PreviewPane from './PreviewPane';
import { validateCode } from '@/utils/iframeUtils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onNextQuestion: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onNextQuestion }) => {
  const [html, setHtml] = useState(question.htmlTemplate);
  const [css, setCss] = useState(question.cssTemplate);
  const [js, setJs] = useState(question.jsTemplate);
  const [activeTab, setActiveTab] = useState('html');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isCorrect: boolean;
    htmlCorrect: boolean;
    cssCorrect: boolean;
    jsCorrect: boolean;
    feedback: string;
  } | null>(null);
  
  const { toast } = useToast();

  // Reset state when question changes
  useEffect(() => {
    setHtml(question.htmlTemplate);
    setCss(question.cssTemplate);
    setJs(question.jsTemplate);
    setActiveTab('html');
    setShowHint(false);
    setShowSolution(false);
    setValidationResult(null);
  }, [question]);

  const handleValidate = () => {
    const result = validateCode(
      html,
      css,
      js,
      question.htmlSolution,
      question.cssSolution,
      question.jsSolution
    );
    
    setValidationResult(result);
    
    if (result.isCorrect) {
      toast({
        title: "Correct!",
        description: "Your solution is correct. Well done!",
      });
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setHtml(question.htmlSolution);
    setCss(question.cssSolution);
    setJs(question.jsSolution);
    
    toast({
      title: "Solution Revealed",
      description: "Take a look at the correct implementation.",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl">Question {question.id}</CardTitle>
            <Badge variant="outline" className="ml-auto">
              {question.htmlSolution ? 'HTML' : ''}
              {question.htmlSolution && (question.cssSolution || question.jsSolution) ? ' + ' : ''}
              {question.cssSolution ? 'CSS' : ''}
              {question.cssSolution && question.jsSolution ? ' + ' : ''}
              {question.jsSolution ? 'JS' : ''}
            </Badge>
          </div>
          <CardDescription className="text-lg mt-2">{question.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Mobile Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="md:hidden">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JS</TabsTrigger>
              </TabsList>
              <TabsContent value="html" className="mt-2">
                <CodeEditor language="html" value={html} onChange={setHtml} />
              </TabsContent>
              <TabsContent value="css" className="mt-2">
                <CodeEditor language="css" value={css} onChange={setCss} />
              </TabsContent>
              <TabsContent value="js" className="mt-2">
                <CodeEditor language="js" value={js} onChange={setJs} />
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Desktop Editors - Side by Side */}
              <div className="hidden md:flex flex-col gap-4">
                <CodeEditor language="html" value={html} onChange={setHtml} height="200px" />
                <CodeEditor language="css" value={css} onChange={setCss} height="200px" />
                <CodeEditor language="js" value={js} onChange={setJs} height="200px" />
              </div>
              
              {/* Preview Pane */}
              <PreviewPane html={html} css={css} js={js} height="640px" />
            </div>
            
            {validationResult && (
              <Alert className={validationResult.isCorrect ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
                <AlertTitle>{validationResult.isCorrect ? "Success!" : "Not Quite Right"}</AlertTitle>
                <AlertDescription className="flex flex-col gap-2">
                  <p>{validationResult.feedback}</p>
                  {!validationResult.isCorrect && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Badge variant={validationResult.htmlCorrect ? "outline" : "destructive"} className="justify-center">
                        HTML {validationResult.htmlCorrect ? "✓" : "✗"}
                      </Badge>
                      <Badge variant={validationResult.cssCorrect ? "outline" : "destructive"} className="justify-center">
                        CSS {validationResult.cssCorrect ? "✓" : "✗"}
                      </Badge>
                      <Badge variant={validationResult.jsCorrect ? "outline" : "destructive"} className="justify-center">
                        JS {validationResult.jsCorrect ? "✓" : "✗"}
                      </Badge>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
            
            {showHint && (
              <Alert>
                <AlertTitle>Hint</AlertTitle>
                <AlertDescription>{question.hint}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-wrap gap-4 justify-between mt-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Button>
                <Button variant="outline" onClick={handleShowSolution}>
                  Reveal Solution
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleValidate}>
                  Check Answer
                </Button>
                <Button variant="secondary" onClick={onNextQuestion}>
                  Next Question
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizQuestion;
