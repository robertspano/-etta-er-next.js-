"use client";

import { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../lib/firebase";

export default function VerifyIdentityPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Load Firebase
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load Firebase scripts
      const loadFirebase = async () => {
        if (window.firebase) {
          setFirebaseLoaded(true);
          return;
        }

        // Load Firebase app
        await new Promise((resolve) => {
          const script1 = document.createElement('script');
          script1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
          script1.onload = resolve;
          document.head.appendChild(script1);
        });

        // Load Firebase auth
        await new Promise((resolve) => {
          const script2 = document.createElement('script');
          script2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js';
          script2.onload = resolve;
          document.head.appendChild(script2);
        });

        // Initialize Firebase
        try {
          window.firebase.initializeApp({
            apiKey: "AIzaSyBBLfPqjGRHcmMNZX567W84-aiVG5rUUE",
            authDomain: "verki-login.firebaseapp.com",
            projectId: "verki-login",
          });
          setFirebaseLoaded(true);
        } catch (error) {
          console.error("Firebase initialization error:", error);
        }
      };

      loadFirebase();
    }
  }, []);

  // Setup reCAPTCHA
  const setUpRecaptcha = () => {
    if (firebaseLoaded && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier("recaptcha-container", {
          size: "invisible",
        });
      } catch (error) {
        console.error("reCAPTCHA setup error:", error);
      }
    }
  };

  // Send SMS code
  const sendCode = async () => {
    if (!firebaseLoaded) {
      alert("Firebase er ekki tilbúið ennþá...");
      return;
    }

    if (!phone.trim()) {
      alert("Vinsamlegast sláðu inn símanúmer");
      return;
    }

    // Ensure phone number starts with +
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+354' + formattedPhone;
    }

    setLoading(true);
    
    try {
      setUpRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      
      console.log('Sending SMS to:', formattedPhone);
      
      const confirmation = await window.firebase.auth().signInWithPhoneNumber(formattedPhone, appVerifier);
      setConfirmResult(confirmation);
      alert("SMS kóði sendur! 📱 Athugaðu símann þinn.");
      console.log('SMS sent successfully');
    } catch (error: any) {
      console.error("SMS send error:", error);
      
      // More specific error messages
      if (error.code === 'auth/invalid-phone-number') {
        alert("Ógilt símanúmer. Notaðu +354 format (t.d. +354 123 4567)");
      } else if (error.code === 'auth/too-many-requests') {
        alert("Of margar beiðnir. Reyndu aftur síðar.");
      } else if (error.code === 'auth/captcha-check-failed') {
        alert("reCAPTCHA villa. Endurhladdu síðunni og reyndu aftur.");
      } else {
        alert("Villa við að senda SMS: " + (error.message || 'Óþekkt villa'));
      }
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.log('Could not clear recaptcha');
        }
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP code
  const verifyCode = async () => {
    if (!confirmResult) {
      alert("Senddu SMS kóða fyrst");
      return;
    }

    if (!otp.trim()) {
      alert("Vinsamlegast sláðu inn SMS kóðann");
      return;
    }

    setLoading(true);

    try {
      await confirmResult.confirm(otp);
      alert("🎉 Auðkennisstaðfesting tókst!");
      
      setTimeout(() => {
        window.location.href = "/dashboard/customer";
      }, 1500);
    } catch (error: any) {
      console.error("OTP verification error:", error);
      alert("Villa í SMS kóða. Reyndu aftur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            📱 Staðfesta auðkenni
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Staðfestu auðkennið þitt með símanúmerinu þínu
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Símanúmer
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  type="tel"
                  placeholder="+354 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading || !!confirmResult}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:bg-gray-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Dæmi: +354 123 4567 (með +354 forskeyti)
                </p>
              </div>
            </div>

            {/* Debug info */}
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              Firebase Status: {firebaseLoaded ? '✅ Tilbúið' : '⏳ Hleður...'}
              {phone && <div>Símanúmer: {phone.startsWith('+') ? phone : '+354' + phone}</div>}
            </div>

            {!confirmResult && (
              <button
                onClick={sendCode}
                disabled={!firebaseLoaded || loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading 
                  ? "Sendir SMS..." 
                  : !firebaseLoaded 
                  ? "Loading Firebase..." 
                  : "Senda SMS kóða"
                }
              </button>
            )}

            <div id="recaptcha-container"></div>

            {confirmResult && (
              <div className="space-y-4 border-t pt-4">
                <p className="text-sm text-green-600 text-center">
                  ✅ SMS kóði sendur! Athugaðu símann þinn.
                </p>
                
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    SMS kóði
                  </label>
                  <input
                    id="otp"
                    type="text"
                    placeholder="Sláðu inn 6-stafa kóðann"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={loading}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm disabled:bg-gray-100"
                  />
                </div>

                <button
                  onClick={verifyCode}
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Staðfestir..." : "Staðfesta kóða"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = "/dashboard/customer"}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            ← Tilbaka á dashboard
          </button>
        </div>
      </div>
    </div>
  );
}