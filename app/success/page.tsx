"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/useConfetti";

export default function SuccessPage() {
  const router = useRouter();
  const triggerConfetti = useConfetti();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [router]);

  triggerConfetti();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img src="/ty.gif" alt="Success" className="w-50 h-40 mb-4" />
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <h2 className="text-3xs">Appreciate the dono gang</h2>
      <p className="mt-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); 
            router.push("/"); 
          }}
          className="text-white underline"
        >
          Click here to go to the home page now
        </a>
      </p>
      <p>Redirecting to the home page in {timer} seconds.</p>
    </div>
  );
}


