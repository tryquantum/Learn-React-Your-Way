"use client";

import { SignInPage } from "@/components/ui/sign-in";

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Sign Up submitted:", data);
    alert("Sign Up Submitted! Check the console for form data.");
  };

  const handleAppleSignIn = () => {
    console.log("Continue with Apple clicked");
    alert("Continue with Apple clicked");
  };

  const handleGoogleSignIn = () => {
    console.log("Continue with Google clicked");
    alert("Continue with Google clicked");
  };

  const handleLinkedInSignIn = () => {
    console.log("Continue with LinkedIn clicked");
    alert("Continue with LinkedIn clicked");
  };

  const handleContactUs = () => {
    alert("Contact Us clicked");
  };

  const handleLogin = () => {
    // Navigate to login page or open login modal
    alert("Navigate to Login page");
  };

  return (
    <SignInPage
      title="Join Synergy Team"
      description="Get started by submitting email address."
      onSubmit={handleSubmit}
      onAppleSignIn={handleAppleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onLinkedInSignIn={handleLinkedInSignIn}
      onContactUs={handleContactUs}
      onLogin={handleLogin}
    />
  );
}
