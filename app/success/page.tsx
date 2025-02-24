
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/useConfetti";

export default function SuccessPage() {
  const router = useRouter();
  const triggerConfetti = useConfetti()

  useEffect(() => {
    triggerConfetti()
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000); 
    return () => clearTimeout(timer);
  }, [router]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <h2 className="">Thank you so much for donating gang!</h2>
      <p className="text-xs">You will be redirected to the home page shortly.</p>
    </div>
  );
}
