"use client";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";
import Logo from "@/components/Logo";

type Mode = "login" | "signup" | "verify" | "forgot" | "reset" | "activate";

export default function AuthPage({ defaultMode = "login" }: { defaultMode?: Mode }) {
  const {
    t,
    login,
    signup,
    verifyEmail,
    resendCode,
    activateAccount,
    requestPasswordReset,
    resetPassword,
    navigate,
  } = useApp();

  const [mode, setMode] = useState<Mode>(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState<string | null>(null);
  const [resetCode, setResetCode] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
    setSuccess("");
  };

  /* ── Login ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const res = login(email, password);
    setLoading(false);
    if (res.ok) {
      navigate("/profile");
    } else if (res.needsVerify) {
      switchMode("verify");
      setError("Please activate your account first.");
    } else {
      setError(res.error ?? "Login failed");
    }
  };

  /* ── Signup ── */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const res = signup({ firstName, lastName, email, password });
    setLoading(false);
    if (res.ok) {
      setVerifyCode(null);
      switchMode("verify");
      setSuccess("Account created! A verification code has been sent to your email.");
    } else {
      setError(res.error);
    }
  };

  /* ── Verify / Activate ── */
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const res = verifyEmail(email, code);
    setLoading(false);
    if (res.ok) {
      navigate("/profile");
    } else {
      setError(res.error ?? "Invalid code");
    }
  };

  const handleActivate = async () => {
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const res = activateAccount(email);
    setLoading(false);
    if (res.ok) {
      setVerifyCode(null);
      setSuccess("Activation code sent to your email. Please check your inbox.");
    } else {
      setError(res.error ?? "Could not send activation.");
    }
  };

  /* ── Forgot / Reset Password ── */
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const res = requestPasswordReset(email);
    setLoading(false);
    if (res.ok) {
      setResetCode(null);
      switchMode("reset");
      setSuccess("A reset code has been sent to your email. Please check your inbox.");
    } else {
      setError(res.error ?? "Could not send reset.");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const res = resetPassword(email, code, newPassword);
    setLoading(false);
    if (res.ok) {
      switchMode("login");
      setPassword("");
      setSuccess("Password reset successfully. Please sign in.");
    } else {
      setError(res.error ?? "Reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-arabesque pt-24">
      <div className="mx-auto grid max-w-5xl gap-0 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-stretch">
        {/* ── Left brand panel ── */}
        <div className="hidden overflow-hidden rounded-l-xl bg-[#0f0e0c] p-12 lg:flex lg:flex-col lg:justify-between">
          <Logo variant="light" size="md" />
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9a84c]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]">
                Ronda, Andalusia
              </span>
            </div>
            <blockquote className="mt-4 font-serif text-2xl font-light leading-relaxed text-[#faf6ee]">
              &ldquo;Eight centuries of Moorish heritage above the El Tajo gorge.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-2">
              <span className="h-3 w-3 rotate-45 bg-[#1d3a8a] inline-block" />
              <span className="h-3 w-3 rotate-45 bg-[#8e1d2c] inline-block" />
              <span className="h-3 w-3 rotate-45 bg-[#1f6f4a] inline-block" />
            </div>
          </div>
          <p className="text-xs text-[#faf6ee]/30">
            Bien de Interés Cultural · Protected heritage site
          </p>
        </div>

        {/* ── Right form panel ── */}
        <div className="surface-card rounded-xl border p-6 shadow-elegant sm:p-10 lg:rounded-l-none lg:rounded-r-xl">
          {/* LOGIN */}
          {mode === "login" && (
            <>
              <Eyebrow>{t("auth.signin")}</Eyebrow>
              <h1 className="mt-4 font-serif text-3xl text-primary">Welcome back</h1>
              <p className="mt-2 text-sm text-secondary">
                Sign in to manage your bookings and audio guide.
              </p>

              {success && <SuccessMsg>{success}</SuccessMsg>}

              <form onSubmit={handleLogin} className="mt-6 space-y-5">
                <FormField
                  label={t("auth.email")}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
                <PasswordField
                  label={t("auth.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  show={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                  autoComplete="current-password"
                />
                {error && <ErrorMsg>{error}</ErrorMsg>}

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-secondary cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-[#e2d5c0] text-[#c9a84c] focus:ring-[#c9a84c]"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => switchMode("forgot")}
                    className="font-medium text-[#a07c28] hover:text-[#0f0e0c] transition dark:hover:text-[#faf6ee]"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
                  disabled={loading}
                >
                  {loading ? "Signing in…" : t("auth.signin")}
                </Button>
              </form>

              <div className="mt-6 flex flex-col gap-3 border-t border-subtle pt-5">
                <p className="text-center text-sm text-secondary">
                  {t("auth.noAccount")}{" "}
                  <button
                    onClick={() => switchMode("signup")}
                    className="font-medium text-[#a07c28] hover:text-[#0f0e0c] transition dark:hover:text-[#faf6ee]"
                  >
                    {t("auth.signup")}
                  </button>
                </p>
                <button
                  onClick={() => switchMode("activate")}
                  className="text-center text-xs text-secondary underline-offset-4 hover:underline"
                >
                  Activate / Resend activation code
                </button>
              </div>
            </>
          )}

          {/* SIGNUP */}
          {mode === "signup" && (
            <>
              <Eyebrow>{t("auth.signup")}</Eyebrow>
              <h1 className="mt-4 font-serif text-3xl text-primary">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-secondary">
                Join Casa del Rey Moro to manage bookings and access the audio guide.
              </p>
              <form onSubmit={handleSignup} className="mt-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label={t("auth.firstName")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    autoComplete="given-name"
                    required
                  />
                  <FormField
                    label={t("auth.lastName")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                </div>
                <FormField
                  label={t("auth.email")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <PasswordField
                  label={t("auth.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  show={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                  autoComplete="new-password"
                />
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
                  disabled={loading}
                >
                  {loading ? "Creating account…" : t("auth.signup")}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-secondary">
                {t("auth.hasAccount")}{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="font-medium text-[#a07c28] hover:text-[#0f0e0c] dark:hover:text-[#faf6ee] transition"
                >
                  {t("auth.signin")}
                </button>
              </p>
            </>
          )}

          {/* VERIFY / ACTIVATE-CODE */}
          {mode === "verify" && (
            <>
              <Eyebrow>{t("auth.verify")}</Eyebrow>
              <h1 className="mt-4 font-serif text-3xl text-primary">
                Check your email
              </h1>
              <p className="mt-3 text-sm text-secondary">{t("auth.verifyCode")}</p>

              {success && <SuccessMsg>{success}</SuccessMsg>}

              <form onSubmit={handleVerify} className="mt-6 space-y-5">
                {!email && (
                  <FormField
                    label={t("auth.email")}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                )}
                <FormField
                  label="6-digit activation code"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="123456"
                  inputMode="numeric"
                  required
                />
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
                  disabled={loading}
                >
                  {loading ? "Activating…" : "Activate Account"}
                </Button>
              </form>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => {
                    const c = resendCode(email);
                    setVerifyCode(c);
                    setSuccess("New code sent.");
                  }}
                  className="text-secondary underline-offset-4 hover:underline"
                >
                  Resend code
                </button>
                <button
                  onClick={() => switchMode("login")}
                  className="text-secondary underline-offset-4 hover:underline"
                >
                  Back to sign in
                </button>
              </div>
            </>
          )}

          {/* ACTIVATE (request) */}
          {mode === "activate" && (
            <>
              <Eyebrow>Activate Account</Eyebrow>
              <h1 className="mt-4 font-serif text-3xl text-primary">
                Resend activation
              </h1>
              <p className="mt-3 text-sm text-secondary">
                Enter your email to receive a new activation code.
              </p>

              <div className="mt-6 space-y-5">
                <FormField
                  label={t("auth.email")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
                {error && <ErrorMsg>{error}</ErrorMsg>}
                {success && <SuccessMsg>{success}</SuccessMsg>}
                <Button
                  onClick={handleActivate}
                  size="lg"
                  className="w-full bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
                  disabled={loading || !email}
                >
                  {loading ? "Sending…" : "Send Activation Code"}
                </Button>
                <Button
                  onClick={() => switchMode("verify")}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Enter Code →
                </Button>
              </div>

              <p className="mt-6 text-center text-sm text-secondary">
                <button
                  onClick={() => switchMode("login")}
                  className="font-medium text-[#a07c28] hover:text-[#0f0e0c] dark:hover:text-[#faf6ee]"
                >
                  ← Back to sign in
                </button>
              </p>
            </>
          )}

          {/* FORGOT */}
          {mode === "forgot" && (
            <>
              <Eyebrow>Forgot Password</Eyebrow>
              <h1 className="mt-4 font-serif text-3xl text-primary">
                Reset your password
              </h1>
              <p className="mt-3 text-sm text-secondary">
                Enter your email and we&apos;ll send you a code to reset your password.
              </p>
              <form onSubmit={handleForgot} className="mt-6 space-y-5">
                <FormField
                  label={t("auth.email")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
                {error && <ErrorMsg>{error}</ErrorMsg>}
                {success && <SuccessMsg>{success}</SuccessMsg>}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Send Reset Code"}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-secondary">
                <button
                  onClick={() => switchMode("login")}
                  className="font-medium text-[#a07c28] hover:text-[#0f0e0c] dark:hover:text-[#faf6ee]"
                >
                  ← Back to sign in
                </button>
              </p>
            </>
          )}

          {/* RESET */}
          {mode === "reset" && (
            <>
              <Eyebrow>New Password</Eyebrow>
              <h1 className="mt-4 font-serif text-3xl text-primary">
                Choose a new password
              </h1>

              {success && <SuccessMsg>{success}</SuccessMsg>}

              <form onSubmit={handleReset} className="mt-6 space-y-5">
                <FormField
                  label="Reset code"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="123456"
                  inputMode="numeric"
                  required
                />
                <PasswordField
                  label="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  show={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                  autoComplete="new-password"
                />
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
                  disabled={loading}
                >
                  {loading ? "Resetting…" : "Reset Password"}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-secondary">
                <button
                  onClick={() => switchMode("login")}
                  className="font-medium text-[#a07c28] hover:text-[#0f0e0c] dark:hover:text-[#faf6ee]"
                >
                  ← Back to sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */
function FormField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium uppercase tracking-widest text-secondary">
        {label}
      </label>
      <input
        className="w-full rounded-md border bg-[var(--input-bg)] px-3.5 py-2.5 text-sm text-primary placeholder-[#7c7060]/50 outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25"
        style={{ borderColor: "var(--input-border)" }}
        {...props}
      />
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder = "••••••••",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  onToggle: () => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium uppercase tracking-widest text-secondary">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full rounded-md border bg-[var(--input-bg)] px-3.5 py-2.5 pr-11 text-sm text-primary placeholder-[#7c7060]/50 outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25"
          style={{ borderColor: "var(--input-border)" }}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-secondary hover:text-primary transition"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[#8e1d2c]/30 bg-[#8e1d2c]/5 px-3 py-2 text-sm text-[#8e1d2c]">
      {children}
    </div>
  );
}

function SuccessMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-md border border-[#1f6f4a]/30 bg-[#1f6f4a]/5 px-3 py-2 text-sm text-[#1f6f4a]">
      {children}
    </div>
  );
}
