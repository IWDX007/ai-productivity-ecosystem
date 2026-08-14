"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/app/contact/actions";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setStatus("sending");
    setErrorMsg("");
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setStatus("success");
      // Reset form
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Failed to send message");
    }
  };

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="How can we help you?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Message *
        </label>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          placeholder="Tell us more about your inquiry..."
        />
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Message sent successfully! We will get back to you soon.</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:opacity-50 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}