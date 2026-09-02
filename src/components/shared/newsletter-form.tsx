"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface NewsletterFormProps {
  placeholder: string;
}

export default function NewsletterForm({ placeholder }: NewsletterFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-input text-foreground text-sm rounded-lg px-4 py-2.5 pr-10 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          aria-label="Submit newsletter"
          className="absolute right-1 top-1 bottom-1 px-3 bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:opacity-95 transition-opacity"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
