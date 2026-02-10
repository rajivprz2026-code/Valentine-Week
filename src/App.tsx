import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { NameContext } from "./lib/name-context";
import NameForm from "./components/NameForm";

const queryClient = new QueryClient();

const App = () => {
  // Read names directly from URL
  const params = new URLSearchParams(window.location.search);
  const boy = params.get("boy");
  const girl = params.get("girl");

  const namesSet = Boolean(boy && girl);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!namesSet ? (
            // Step 1: Generate shareable link
            <NameForm />
          ) : (
            // Step 2: Open HeroSection via link
            <NameContext.Provider value={{ boy: boy!, girl: girl! }}>
              <Routes>
                <Route path="/" element={<Index />} />
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
