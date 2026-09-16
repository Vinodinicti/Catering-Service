import React, { useState } from 'react';
import { ShieldCheck, Lock, X, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminAuthModal({ isOpen, onClose, onAuthenticate }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default admin passcode: admin123 or royaladmin
    if (passcode.trim() === 'admin123' || passcode.trim() === 'royaladmin') {
      setError(false);
      setPasscode('');
      onAuthenticate();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-palette-eggplant/80 backdrop-blur-md transition-opacity animate-fadeIn" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white text-palette-eggplant rounded-3xl border border-palette-laceBorder shadow-2xl z-10 animate-scaleUp p-5 sm:p-8 space-y-5 my-auto">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-palette-eggplant/60 hover:text-palette-eggplant rounded-full hover:bg-palette-lace transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-palette-eggplant text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8 text-palette-shamrock" />
          </div>
          <h3 className="font-serif text-2xl font-extrabold text-palette-eggplant mt-3">
            Admin Portal Authentication
          </h3>
          <p className="text-xs text-palette-eggplant/75 max-w-xs mx-auto">
            Please enter your secure administrator passcode to access bookings, revenue analytics, and menu management.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase text-palette-eggplant/80 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-palette-shamrock" />
              <span>Admin Passcode *</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter admin passcode..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full px-4 py-3 bg-palette-lace border rounded-xl text-sm font-bold text-palette-eggplant focus:outline-none transition-all ${
                  error ? 'border-red-500 ring-2 ring-red-400/20' : 'border-palette-laceBorder focus:border-palette-shamrock'
                }`}
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Invalid admin passcode. Please try again.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Lock className="w-4 h-4 text-white" />
            <span>Unlock Admin Dashboard</span>
          </button>
        </form>

        <div className="bg-palette-lilacLight p-3.5 rounded-2xl border border-palette-lilac/40 text-center">
          <p className="text-[11px] font-bold text-palette-eggplant/80">
            🔑 Security Hint: Passcode is <span className="font-extrabold text-palette-eggplant underline">admin123</span>
          </p>
        </div>

      </div>
    </div>
  );
}
