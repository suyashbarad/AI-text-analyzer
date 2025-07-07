
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { Brain, Lightbulb, TrendingUp, FileText, Sparkles, Send } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSentiment = (text) => {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'excited', 'perfect', 'awesome', 'brilliant', 'outstanding', 'superb', 'delighted', 'thrilled', 'pleased', 'satisfied', 'positive', 'success', 'achieve', 'win', 'benefit', 'improve', 'better', 'best', 'increase', 'growth', 'progress', 'on time', 'timely', 'appreciate', 'grateful', 'thankful', 'admire', 'respect', 'trust', 'supportive', 'encouraging', 'motivated', 'optimistic', 'hopeful', 'uplifting', 'inspiring', 'joyful', 'content', 'relieved', 'calm', 'peaceful', 'reassured', 'confident', 'empowered', 'enthusiastic', 'excelling', 'triumph', 'victory', 'achievement', 'prosperous', 'favorable', 'advantageous', 'beneficial', 'rewarding', 'fruitful', 'productive', 'constructive', 'valuable', 'worthwhile', 'meaningful', 'significant', 'impactful', 'transformative', 'life-changing', 'enriching', 'fulfilling', 'satisfying', 'gratifying', 'pleasurable', 'delightful', 'charming', 'captivating', 'engaging', 'entertaining', 'amusing', 'funny', 'humorous'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'angry', 'frustrated', 'disappointed', 'worried', 'concerned', 'problem', 'issue', 'fail', 'failure', 'wrong', 'error', 'difficult', 'hard', 'struggle', 'challenge', 'poor', 'worst', 'negative', 'decline', 'decrease', 'late', 'missed', 'lost', 'regret', 'unhappy', 'upset', 'confused', 'annoyed', 'irritated', 'displeased', 'dissatisfied', 'uncomfortable', 'unpleasant', 'stressful', 'overwhelmed', 'burdened', 'exhausted', 'tired', 'fatigued', 'drained', 'abominable', 'very unpleasant', 'disagreeable', 'miserable', 'terrible', 'deplorable', 'foul', 'unsuitable', 'unacceptable', 'unfavorable', 'unfortunate', 'undesirable', 'distressing', 'disturbing', 'troubling', 'worrisome', 'alarming', 'dismaying', 'disheartening'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'Positive';
    if (negativeCount > positiveCount) return 'Negative';
    return 'Neutral';
  };

  const generateSummary = (text) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length <= 2) return text.trim();
    
    const firstSentence = sentences[0].trim();
    const lastSentence = sentences[sentences.length - 1].trim();
    
    return `${firstSentence}. ${lastSentence}.`;
  };

  const generateSuggestions = (text, sentiment) => {
    const suggestions = [];
    const wordCount = text.split(/\s+/).length;
    
    if (sentiment === 'Negative') {
      suggestions.push('Consider reframing negative points with potential solutions');
      suggestions.push('Add specific examples to support your concerns');
      suggestions.push('Include actionable steps to address the issues mentioned');
    } else if (sentiment === 'Positive') {
      suggestions.push('Share this positive feedback with relevant stakeholders');
      suggestions.push('Document successful strategies for future reference');
      suggestions.push('Consider expanding on what made this experience positive');
    } else {
      suggestions.push('Add more specific details to strengthen your message');
      suggestions.push('Consider including examples to illustrate your points');
      suggestions.push('Think about the desired outcome and make it clearer');
    }
    
    if (wordCount < 50) {
      suggestions.push('Consider expanding your content with more details');
    } else if (wordCount > 200) {
      suggestions.push('Try to make your message more concise and focused');
    }
    
    if (!text.includes('?') && !text.includes('!')) {
      suggestions.push('Consider adding questions or calls to action');
    }
    
    return suggestions.slice(0, 3);
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter some text to analyze first! 📝",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sentiment = analyzeSentiment(inputText);
    const summary = generateSummary(inputText);
    const suggestions = generateSuggestions(inputText, sentiment);
    
    setAnalysis({
      summary,
      sentiment,
      suggestions
    });
    
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete! ✨",
      description: "Your text has been successfully analyzed!"
    });
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-500';
      case 'Negative': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return '😊';
      case 'Negative': return '😔';
      default: return '😐';
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Text Analyzer - Smart Content Analysis Tool</title>
        <meta name="description" content="Analyze any text with AI-powered sentiment detection, automatic summarization, and actionable suggestions for improvement." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 pt-8"
          >
            <div className="flex justify-center items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Text Analyzer
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Unlock insights from your text with intelligent analysis, sentiment detection, and actionable suggestions
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Enter Your Text</h2>
                </div>
                
                <Textarea
                  placeholder="Paste or type your text here for analysis... (e.g., customer feedback, email content, social media posts, etc.)"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[150px] bg-white/5 border-white/20 text-white placeholder:text-white/50 resize-none"
                />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">
                    {inputText.length} characters • {inputText.split(/\s+/).filter(w => w.length > 0).length} words
                  </span>
                  
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !inputText.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Analyze Text
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Summary */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Summary</h3>
                </div>
                <p className="text-white/90 leading-relaxed bg-white/5 p-4 rounded-lg border border-white/10">
                  {analysis.summary}
                </p>
              </Card>

              {/* Sentiment */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Sentiment Analysis</h3>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getSentimentColor(analysis.sentiment)} text-white px-4 py-2 text-lg font-semibold`}>
                    {getSentimentIcon(analysis.sentiment)} {analysis.sentiment}
                  </Badge>
                  <span className="text-white/70">
                    Overall emotional tone detected in the text
                  </span>
                </div>
              </Card>

              {/* Suggestions */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-white">Actionable Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
                    >
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-white/90 leading-relaxed">{suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Empty State */}
          {!analysis && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center py-12"
            >
              <div className="bg-white/5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Ready to Analyze</h3>
              <p className="text-white/60 max-w-md mx-auto">
                Enter your text above and click "Analyze Text" to get intelligent insights, sentiment analysis, and actionable suggestions.
              </p>
            </motion.div>
          )}
        </div>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;
