"use client";

import { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../lib/firebase";

export default function VerifyIdentityPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Setja upp Recaptcha
  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  };

  // Format phone number for Firebase
  const formatPhoneForFirebase = (phoneNumber: string): string => {
    // Remove all spaces, dashes, parentheses, and other formatting
    let cleaned = phoneNumber.replace(/[\s\-\(\)\.\+]/g, '');
    
    // If it starts with 354 (Iceland country code without +), add the +
    if (cleaned.startsWith('354') && cleaned.length === 10) {
      return '+' + cleaned;
    }
    
    // If it doesn't start with +, assume it's Iceland and add +354
    if (!cleaned.startsWith('+')) {
      // If it's 7 digits, it's a local Iceland number
      if (cleaned.length === 7) {
        return '+354' + cleaned;
      }
      // If it's 10 digits and starts with 354, add +
      if (cleaned.length === 10 && cleaned.startsWith('354')) {
        return '+' + cleaned;
      }
      // Otherwise assume it needs +354 prefix
      return '+354' + cleaned;
    }
    
    return cleaned;
  };

  // Validate phone number format
  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const formatted = formatPhoneForFirebase(phoneNumber);
    // Iceland phone numbers should be +354 followed by 7 digits
    const icelandRegex = /^\+354[0-9]{7}$/;
    return icelandRegex.test(formatted);
  };

  // Senda SMS
  const sendCode = async () => {
    if (!phone.trim()) {
      alert("Vinsamlegast sláðu inn símanúmer");
      return;
    }

    // Format and validate phone number
    const formattedPhone = formatPhoneForFirebase(phone);
    
    if (!validatePhoneNumber(phone)) {
      alert("Vinsamlegast sláðu inn gilt íslenskt símanúmer (t.d. +354 123 4567 eða 123 4567)");
      return;
    }

    console.log('Original phone:', phone);
    console.log('Formatted phone:', formattedPhone);

    setLoading(true);
    setupRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;
    
    try {
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmResult(confirmation);
      alert("📲 SMS kóði sendur! Athugaðu símann þinn.");
    } catch (err: any) {
      console.error('Firebase error:', err);
      let errorMessage = "Villa við SMS sending";
      
      // Provide more specific error messages
      if (err.code === 'auth/invalid-phone-number') {
        errorMessage = "Ógilt símanúmer. Vinsamlegast notaðu íslenskt símanúmer (t.d. +354 123 4567)";
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "Of margar tilraunir. Vinsamlegast reyndu aftur síðar.";
      } else if (err.code === 'auth/quota-exceeded') {
        errorMessage = "SMS kvóti náð. Vinsamlegast reyndu aftur síðar.";
      } else {
        errorMessage = `Villa við SMS: ${err.message}`;
      }
      
      alert(errorMessage);
      
      // Reset reCAPTCHA on error
      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
        } catch (e) {
          console.log('Could not clear recaptcha');
        }
        (window as any).recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // Staðfesta OTP
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
      alert("✅ Auðkennisstaðfesting tókst!");
      
      // Redirect back to dashboard after successful verification
      setTimeout(() => {
        window.location.href = "/dashboard/customer";
      }, 1500);
    } catch (err: any) {
      console.error(err);
      alert("Villa í OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // UI
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
              <input
                id="phone"
                type="tel"
                placeholder="+354 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading || !!confirmResult}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:bg-gray-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Dæmi: +354 123 4567 (með +354 forskeyti)
              </p>
            </div>

            {!confirmResult && (
              <button
                onClick={sendCode}
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sendir SMS..." : "Senda SMS kóða"}
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