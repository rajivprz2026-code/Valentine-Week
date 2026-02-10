import { useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { NameContext } from "./lib/name-context";
import NameForm from "./components/NameForm"; // our name input page

const queryClient = new QueryClient();

const App = () => {
  // Try to get names from URL params
  const params = new URLSearchParams(window.location.search);
  const initialBoy = params.get("boy") || "";
  const initialGirl = params.get("girl") || "";

  const [boy, setBoy] = useState(initialBoy);
  const [girl, setGirl] = useState(initialGirl);
  const [namesSet, setNamesSet] = useState(initialBoy && initialGirl ? true : false);

  const handleNamesSubmit = (boyName: string, girlName: string) => {
    setBoy(boyName);
    setGirl(girlName);
    setNamesSet(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!namesSet ? (
            // Show the NameForm first if names are not set
            <NameForm onSubmit={handleNamesSubmit} />
          ) : (
            // Once names are set, provide context to the rest of the app
            <NameContext.Provider value={{ boy, girl }}>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </NameContext.Provider>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
