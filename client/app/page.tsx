"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RamjetLogo from "@/app/components/ui/logo";
import Button from "@/app/components/ui/button";
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  ArrowRight, 
  ChevronDown,
  Heart,
  Users,
  TrendingUp
} from "lucide-react";
import NavBar from "./components/layout/navBar";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      desc: "Sub-millisecond response times. Your data is always hot and ready."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      desc: "End-to-end encryption with SOC 2 compliance built in from day one."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Analytics",
      desc: "Monitor cache hit rates, latency, and throughput in real time."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Edge",
      desc: "Deploy across 50+ regions worldwide. Close to your users, everywhere."
    }
  ];

  const stats = [
    { value: "99.99%", label: "Uptime SLA", icon: <Shield className="w-5 h-5" /> },
    { value: "<2ms", label: "Avg Latency", icon: <Zap className="w-5 h-5" /> },
    { value: "10M+", label: "Requests/sec", icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
    <NavBar />

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-screen"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <RamjetLogo size="xl" animated={true} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-center tracking-tight mb-6"
        >
          Cache without
          <br />
          <span className="text-orange-600">compromise</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-500 text-center max-w-2xl mb-10"
        >
          A server-side caching system built for teams that need speed, reliability, and scale without the operational headache.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex gap-4"
        >
          <Button 
            variant="primary" 
            size="lg" 
            text="Start Free" 
            onClick={() => window.location.href = "/auth/register"}
            className="px-8"
          />
          <Button 
            variant="outlined" 
            size="lg" 
            text="View Docs" 
            onClick={() => window.location.href = "/docs"}
            className="px-8"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <div className="bg-zinc-50 border-y border-gray-100">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              custom={i}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="text-orange-600 mb-1">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for performance</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything you need to cache at scale, nothing you don't.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl border border-gray-100 bg-white hover:border-orange-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* How It Works */}
      <div className="bg-zinc-50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Three steps to speed</h2>
            <p className="text-gray-500 text-lg">From zero to cached in under five minutes.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Connect", desc: "Point your application to our edge endpoints. One config change." },
              { step: "02", title: "Configure", desc: "Set TTL, eviction policies, and cache rules through our dashboard or API." },
              { step: "03", title: "Scale", desc: "Watch response times drop and throughput climb. Automatically." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -30 : i === 2 ? 30 : 0, y: i === 1 ? 30 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="text-7xl font-bold text-gray-100 absolute -top-4 -left-2 select-none">
                  {item.step}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof / Trust */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="text-sm font-medium text-orange-600 uppercase tracking-wider">Trusted by builders</span>
          </div>
          <h2 className="text-3xl font-bold">Teams that move fast</h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { quote: "Dropped our API latency from 200ms to under 5ms. Ramjet just works.", author: "Engineering Lead", company: "Fintech Startup" },
            { quote: "Migrated from Redis in a weekend. The dashboard made it painless.", author: "Senior DevOps", company: "SaaS Platform" },
            { quote: "We handle 2M requests per minute. Ramjet hasn't blinked.", author: "CTO", company: "E-commerce" }
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              className="p-6 rounded-2xl bg-zinc-50 border border-gray-100"
            >
              <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-zinc-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to speed things up?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Start caching in minutes. No credit card required. No complex setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                text="Get Started Free" 
                onClick={() => window.location.href = "/register"}
                className="bg-orange-600 hover:bg-orange-700 px-8"
              />
              <Button 
                variant="outline" 
                size="lg" 
                text="Talk to Sales" 
                onClick={() => window.location.href = "/contact"}
                className="border-white/20 text-white hover:bg-white/10 px-8"
              />
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Free tier includes 1GB cache, 100K requests/day, and 2 regions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 text-gray-400 py-12 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <RamjetLogo size="md" animated={false} />
            </div>
            <div className="flex gap-8 text-sm">
              <a href="/docs" className="hover:text-white transition-colors">Docs</a>
              <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="/status" className="hover:text-white transition-colors">Status</a>
              <a href="/auth/login" className="hover:text-white transition-colors">Sign in</a>
            </div>
            <div className="text-sm">
              © 2026 RAMJET
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}