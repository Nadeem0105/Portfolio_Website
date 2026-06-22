"use client";

import { useState, useEffect } from "react";
import { Mail, Clock, MapPin, ShieldCheck } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [istTime, setIstTime] = useState("");
  const [availability, setAvailability] = useState("ONLINE");

  useEffect(() => {
    const updateIstTime = () => {
      try {
        const options = {
          timeZone: "Asia/Kolkata",
          hour: "2-digit" as const,
          minute: "2-digit" as const,
          second: "2-digit" as const,
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const timeString = formatter.format(new Date());
        setIstTime(timeString);

        const hour = parseInt(timeString.split(":")[0], 10);
        // Active hours: 9 AM to 10 PM IST
        if (hour >= 9 && hour < 22) {
          setAvailability("ONLINE");
        } else {
          setAvailability("OFFLINE");
        }
      } catch {
        const now = new Date();
        setIstTime(now.toLocaleTimeString());
      }
    };

    updateIstTime();
    const interval = setInterval(updateIstTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error for this field as they type
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    
    if (formData.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }

    if (formData.subject.trim().length < 2) {
      tempErrors.subject = "Subject must be at least 2 characters";
    }

    if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus("sending");
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setSuccessMsg(result.message || "Message dispatched successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Failed to dispatch message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Network failure. Connection refused.");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 border-b border-border-subtle bg-obsidian relative overflow-hidden"
    >
      {/* Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#252528_1px,transparent_1px),linear-gradient(to_bottom,#252528_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_30%,transparent_100%)] opacity-[0.025] animate-grid-pan" />
        <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] animate-float-reverse" />
      </div>

      <div className="max-w-container-max mx-auto px-gutter w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16 relative w-fit">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
            08 / ENDPOINT
          </div>
          <h2 className="font-display text-4xl font-extrabold text-cream">
            ESTABLISH_CONNECTION
          </h2>
          <span className="absolute -top-3 -right-2 font-mono text-xs text-primary/45 font-bold select-none">+</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Form */}
          <div className="lg:col-span-7 bg-surface border border-border-subtle p-8 relative z-30 plus-corner-tr plus-corner-bl">
            <h3 className="font-display text-lg font-bold text-cream mb-6">
              SECURE_MESSAGE_GATEWAY
            </h3>

            <form onSubmit={onSubmit} className="space-y-6 font-mono text-xs relative z-30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-outline uppercase block font-bold">SENDER_NAME *</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="w-full bg-elevated border border-border-subtle/80 px-4 py-3 text-cream outline-none focus:border-primary transition-colors focus:ring-0 focus:outline-none relative z-50 pointer-events-auto"
                  />
                  {errors.name && (
                    <p className="text-error-red text-[10px] mt-1 font-bold">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-outline uppercase block font-bold">SENDER_EMAIL *</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-elevated border border-border-subtle/80 px-4 py-3 text-cream outline-none focus:border-primary transition-colors focus:ring-0 focus:outline-none relative z-50 pointer-events-auto"
                  />
                  {errors.email && (
                    <p className="text-error-red text-[10px] mt-1 font-bold">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-outline uppercase block font-bold">MESSAGE_SUBJECT *</label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry / Scaling build request"
                  className="w-full bg-elevated border border-border-subtle/80 px-4 py-3 text-cream outline-none focus:border-primary transition-colors focus:ring-0 focus:outline-none relative z-50 pointer-events-auto"
                />
                {errors.subject && (
                  <p className="text-error-red text-[10px] mt-1 font-bold">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-outline uppercase block font-bold">PAYLOAD_CONTENT *</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Compose system description / details..."
                  className="w-full bg-elevated border border-border-subtle/80 px-4 py-3 text-cream outline-none focus:border-primary transition-colors focus:ring-0 focus:outline-none resize-none relative z-50 pointer-events-auto"
                />
                {errors.message && (
                  <p className="text-error-red text-[10px] mt-1 font-bold">{errors.message}</p>
                )}
              </div>

              {/* Form Status Messages */}
              {status === "success" && (
                <div className="p-4 bg-[#39D353]/10 border border-[#39D353]/35 text-[#39D353] text-[11px] font-bold">
                  STATUS: {successMsg}
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-error-red/10 border border-error-red/35 text-error-red text-[11px] font-bold">
                  FATAL: {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full font-mono text-xs font-bold bg-primary text-obsidian border border-primary px-6 py-3.5 rounded hover:bg-transparent hover:text-primary transition-colors hover-trigger flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {status === "sending" ? "DISPATCHING_PAYLOAD..." : "TRANSMIT_MESSAGE"}
              </button>
            </form>
          </div>

          {/* Right Side: Network Info & Keys */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            <div className="bg-surface border border-border-subtle p-6 space-y-4">
              <h4 className="font-display text-sm font-bold text-cream border-b border-border-subtle/40 pb-3 flex items-center gap-2">
                <ShieldCheck className="text-primary" size={16} />
                <span>CONNECTION_PARAMS</span>
              </h4>

              <div className="space-y-4 text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <Mail className="text-primary shrink-0 mt-0.5" size={14} />
                  <div>
                    <p className="text-outline uppercase text-[10px] font-bold">DIRECT_EMAIL</p>
                    <a href="mailto:nadeemmd.0105@gmail.com" className="text-cream font-semibold hover:text-primary transition-colors">
                      nadeemmd.0105@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-primary shrink-0 mt-0.5" size={14} />
                  <div>
                    <p className="text-outline uppercase text-[10px] font-bold">AVAILABILITY_CLOCK (IST)</p>
                    <p className="text-cream font-semibold font-mono text-sm tracking-wider">
                      {istTime || "12:00:00"} <span className="text-[10px] text-primary">IST (UTC+5:30)</span>
                    </p>
                    <p className="text-outline text-[10px] flex items-center gap-1.5 mt-0.5">
                      CORE_HOURS: 09:00 - 22:00
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${availability === "ONLINE" ? "bg-[#39D353] animate-pulse" : "bg-neutral-600"}`} />
                      <span className={availability === "ONLINE" ? "text-[#39D353]" : "text-neutral-500"}>{availability}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-primary shrink-0 mt-0.5" size={14} />
                  <div>
                    <p className="text-outline uppercase text-[10px] font-bold">GEOLOCATION</p>
                    <p className="text-cream font-semibold">Kolkata, WB, India</p>
                    <p className="text-outline text-[10px]">COORDINATES: 22.5726° N, 88.3639° E</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-outline text-[10px] text-center leading-relaxed">
              * Transmission encrypted using TLS 1.3 / API route verification tokens.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
