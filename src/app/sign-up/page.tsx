"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-muted/30 p-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-lg shadow-black/5">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            AI Agency OS
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Create your account</h1>
        </div>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
