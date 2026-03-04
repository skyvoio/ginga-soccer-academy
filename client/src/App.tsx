import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import GingaMax from "@/pages/GingaMax";
import Schedule from "@/pages/Schedule";
import Booking from "@/pages/Booking";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import About from "@/pages/About";
import Media from "@/pages/Media";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/programs" component={Programs} />
      <Route path="/gingamax" component={GingaMax} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/booking" component={Booking} />
      <Route path="/about" component={About} />
      <Route path="/media" component={Media} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route>
        <div className="min-h-screen pt-32 text-center px-6">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter font-display">
            PAGE NOT FOUND
          </h1>
          <p className="text-neutral-400 mt-4">
            The page you're looking for doesn't exist.
          </p>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black">
          {!isAdmin && <Navbar />}
          <Router />
          {!isAdmin && <Footer />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
