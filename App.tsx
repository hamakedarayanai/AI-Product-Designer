
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { BriefInput } from './components/BriefInput';
import { ConceptGallery } from './components/ConceptGallery';
import { RefinementControls } from './components/RefinementControls';
import { MarketingKit } from './components/MarketingKit';
import { Loader } from './components/Loader';
import { geminiService } from './services/geminiService';
import { MarketingKitData } from './types';

enum AppStep {
  BRIEF,
  CONCEPTS,
  MARKETING,
}

const App: React.FC = () => {
  const [brief, setBrief] = useState<string>('');
  const [concepts, setConcepts] = useState<string[]>([]);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [marketingKit, setMarketingKit] = useState<MarketingKitData | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.BRIEF);

  const handleError = (message: string) => {
    setError(message);
    setIsLoading(false);
    setTimeout(() => setError(null), 5000);
  };

  const handleGenerateConcepts = useCallback(async (newBrief: string) => {
    if (!newBrief.trim()) {
      handleError('Please enter a design brief.');
      return;
    }
    setIsLoading(true);
    setLoadingMessage('Generating initial concepts...');
    setBrief(newBrief);
    setConcepts([]);
    setSelectedConcept(null);
    setMarketingKit(null);

    try {
      const generatedConcepts = await geminiService.generateConcepts(newBrief);
      setConcepts(generatedConcepts);
      setCurrentStep(AppStep.CONCEPTS);
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to generate concepts.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefineWithText = useCallback(async (refinementText: string) => {
    if (!refinementText.trim()) {
      handleError('Please enter a refinement instruction.');
      return;
    }
    setIsLoading(true);
    setLoadingMessage('Refining your design...');
    setSelectedConcept(null);

    try {
      const refinedConcepts = await geminiService.refineWithText(brief, refinementText);
      setConcepts(refinedConcepts);
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to refine concepts.');
    } finally {
      setIsLoading(false);
    }
  }, [brief]);

  const handleRefineWithImage = useCallback(async (file: File) => {
    setIsLoading(true);
    setLoadingMessage('Analyzing inspiration and redesigning...');
    setSelectedConcept(null);

    try {
      const refinedConcepts = await geminiService.refineWithImage(brief, file);
      setConcepts(refinedConcepts);
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to refine with image.');
    } finally {
      setIsLoading(false);
    }
  }, [brief]);

  const handleGenerateMarketingKit = useCallback(async () => {
    if (!selectedConcept || !brief) {
      handleError('Please select a final design first.');
      return;
    }
    setIsLoading(true);
    setLoadingMessage('Building your marketing kit...');
    
    try {
      const kit = await geminiService.generateMarketingKit(brief, "the user's selected product design");
      setMarketingKit(kit);
      setCurrentStep(AppStep.MARKETING);
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to generate marketing kit.');
    } finally {
      setIsLoading(false);
    }
  }, [brief, selectedConcept]);
  
  return (
    <div className="min-h-screen bg-dark-bg text-light-text">
      {isLoading && <Loader message={loadingMessage} />}
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="space-y-12">
          <section id="step1-brief">
             {currentStep === AppStep.BRIEF && <BriefInput onGenerate={handleGenerateConcepts} />}
             {currentStep !== AppStep.BRIEF && (
                <div className="p-6 bg-dark-card border border-dark-border rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-brand-blue mb-2">Your Design Brief</h2>
                    <p className="text-medium-text">{brief}</p>
                </div>
             )}
          </section>

          {currentStep >= AppStep.CONCEPTS && (
            <section id="step2-concepts">
              <ConceptGallery
                concepts={concepts}
                selectedConcept={selectedConcept}
                onSelect={setSelectedConcept}
              />
              {currentStep === AppStep.CONCEPTS && (
                <RefinementControls
                    onTextSubmit={handleRefineWithText}
                    onImageSubmit={handleRefineWithImage}
                    onGenerateMarketingKit={handleGenerateMarketingKit}
                    isKitGenerationEnabled={!!selectedConcept}
                />
              )}
            </section>
          )}

          {currentStep === AppStep.MARKETING && marketingKit && (
            <section id="step3-marketing">
              <MarketingKit kit={marketingKit} />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
