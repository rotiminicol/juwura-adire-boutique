
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="border-2 border-primary shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-sm">We use cookies</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 -mr-2 -mt-2"
              onClick={rejectCookies}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            We use cookies to enhance your browsing experience and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
          <div className="flex gap-2">
            <Button onClick={acceptCookies} size="sm" className="flex-1">
              Accept
            </Button>
            <Button onClick={rejectCookies} variant="outline" size="sm">
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
