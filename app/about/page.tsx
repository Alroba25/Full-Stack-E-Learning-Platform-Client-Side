import Navbar from "@/components/Navbar";
import { Users, BookOpen, Globe, Award, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-sans relative overflow-x-hidden selection:bg-[#4facfe]/30">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(79,172,254,0.08)_0%,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute top-[40%] right-[-5%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(164,53,240,0.08)_0%,rgba(0,0,0,0)_70%)]"></div>

      <Navbar />

      <main className="grow z-10">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-8 py-24 pt-32 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#4facfe] font-bold text-sm mb-6 tracking-wide uppercase">
            Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight bg-clip-text text-transparent bg-linear-to-r from-white via-white to-white/60">
            Empowering the World <br className="hidden md:block" /> to Learn and
            Grow
          </h1>
          <p className="text-[#a0a0a0] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            We believe that education is a fundamental human right. Our platform
            breaks down barriers to give anyone, anywhere, access to premium
            quality education.
          </p>
        </section>

        {/* Stats Section */}
        <section className="max-w-[1200px] mx-auto px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Active Learners", value: "2M+" },
              { icon: BookOpen, label: "Premium Courses", value: "5,000+" },
              { icon: Globe, label: "Countries Reached", value: "150+" },
              { icon: Award, label: "Expert Instructors", value: "1,200+" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#4facfe]/10 flex items-center justify-center text-[#4facfe] mb-4">
                  <stat.icon size={28} />
                </div>
                <h3 className="text-4xl font-extrabold mb-2">{stat.value}</h3>
                <p className="text-[#888] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold tracking-tighter">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-linear-to-r from-[#4facfe] to-[#00f2fe] rounded-full"></div>
              <p className="text-[#d1d7dc] text-lg leading-relaxed">
                Founded in 2026, E-Platform Learning started with a simple
                vision: to create a digital classroom that feels more engaging,
                personal, and effective than traditional learning environments.
              </p>
              <p className="text-[#d1d7dc] text-lg leading-relaxed">
                What began as a small collection of web development tutorials
                has blossomed into a comprehensive ecosystem covering
                technology, business, design, and personal development. We
                partner with industry leaders to ensure our curriculum
                represents the cutting edge of what the market demands.
              </p>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-linear-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center z-0">
                {/* Decorative element */}
                <div className="w-64 h-64 border-4 border-white/5 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 border-4 border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-linear-to-tr from-[#4facfe] to-[#a435f0] rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 z-10 backdrop-blur-[2px]"></div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white/2 border-t border-b border-white/5 py-24">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tighter mb-4">
                Our Core Values
              </h2>
              <p className="text-[#888] text-lg max-w-2xl mx-auto">
                The principles that guide every decision we make and every
                feature we build.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Excellence First",
                  desc: "We never compromise on the quality of our content. Every course goes through rigorous review.",
                },
                {
                  icon: Zap,
                  title: "Continuous Innovation",
                  desc: "The tech world moves fast. We adapt our platform and curriculum daily to stay ahead.",
                },
                {
                  icon: Globe,
                  title: "Radical Accessibility",
                  desc: "Learning should be affordable and available on any device, on any connection speed.",
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 hover:-translate-y-2 hover:border-[#4facfe]/30 hover:shadow-[0_10px_40px_rgba(79,172,254,0.1)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 border border-white/10">
                    <value.icon className="text-[#4facfe]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-[#888] leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[800px] mx-auto px-8 py-32 text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-[#a0a0a0] text-lg mb-10">
            Join millions of learners worldwide and unlock your full potential
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="px-8 py-4 bg-white text-black font-extrabold rounded-xl hover:bg-gray-200 transition-colors text-lg"
            >
              Explore Courses
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-extrabold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Join for Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-16 text-center border-t border-white/5 text-[#666] bg-black/50">
        <p>&copy; 2026 E-Platform Learning. Premium Educational Experience.</p>
      </footer>
    </div>
  );
}
