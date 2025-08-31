"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, Users, Rocket, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import ThreeDimensionalCard from "@/components/three-dimensional-card"
import ParallaxText from "@/components/parallax-text"
import Image from "next/image"
import TeamSection from "@/components/team-section" // Import the new TeamSection component
import ShaderBackground from "@/components/shader-background"

export default function AboutPageClient() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const teamSectionRef = useRef<HTMLDivElement>(null) // Ref for the team section

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
      },
    }),
  }

  const scrollToTeam = () => {
    teamSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <div
        className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 text-gray-900"
        ref={containerRef}
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-16 lg:py-20 text-center bg-black min-h-[50vh]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Digital Services Background.jpg"
              alt="Digital Services Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-violet-800/70 to-purple-900/80" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
                <Users className="mr-1 h-3 w-3" /> Our Story
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About Cave Motions
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-4xl mx-auto text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Founded in Kampala, we craft future‑ready products and experiences at the intersection of design, software, and AI. We partner with bold teams to turn ideas into lovable, scalable digital realities.
            </motion.p>
          </div>
        </section>

        {/* Marquee Brand Section */}
        <section className="bg-black py-10 overflow-hidden border-t border-white/10">
          <div className="py-4">
            <ParallaxText baseVelocity={-2}>
              KAMPALA • UGANDA • WEB DESIGN • SOFTWARE DEVELOPMENT • AI AUTOMATION • MOBILE APPS • SINCE 2018 • BUGOLOBI •
            </ParallaxText>
          </div>
        </section>


        {/* Who We Are Section - Enhanced */}
        <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate innovators crafting digital experiences that transform businesses and inspire growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Based in the vibrant heart of Bugolobi, Kampala, Cave Motions is where creativity meets cutting-edge technology. Since 2018, we've been the digital architects behind Uganda's most innovative brands, transforming ideas into powerful digital realities.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our team of visionary designers, skilled developers, and strategic thinkers doesn't just build websites and apps – we craft digital experiences that captivate, engage, and drive meaningful results.
                  </p>
                </div>

                {/* Animated Feature List */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">What We Excel At:</h3>
                  {[
                    { text: "Custom web design that tells your story", delay: 0.1 },
                    { text: "Intelligent software solutions", delay: 0.2 },
                    { text: "AI automation that transforms workflows", delay: 0.3 },
                    { text: "Mobile applications that users love", delay: 0.4 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: item.delay }}
                      className="flex items-center group"
                    >
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-lg text-gray-700 group-hover:text-purple-700 transition-colors duration-300">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-6"
                >
                  <Button
                    onClick={scrollToTeam}
                    className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Meet Our Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative group">
                  {/* Floating elements */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200 rounded-full opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-violet-200 rounded-full opacity-40 group-hover:scale-110 transition-transform duration-500 delay-100"></div>

                  {/* Main image container */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                    <Image
                      src="/images/CavemoTeam.jpg"
                      alt="Cave Motions creative team collaborating on innovative digital solutions in Kampala Uganda - web development AI automation experts"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                  >
                    <span className="text-sm font-semibold text-purple-700">Since 2018</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
          {/* Animated background grid */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 237, 0.1) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            ></div>
          </div>

          <div className="container mx-auto max-w-6xl relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Cave Motions?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We combine local expertise with global standards to deliver exceptional digital solutions that make your brand unforgettable.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovative Approach",
                  description:
                    "We merge creativity and technology to deliver unique solutions that set your business apart from the competition.",
                  delay: 0,
                },
                {
                  title: "Client-Centered",
                  description:
                    "Every project is designed with your audience in mind, ensuring maximum engagement and conversion for your business.",
                  delay: 0.1,
                },
                {
                  title: "Local Roots, Global Standards",
                  description:
                    "Proudly Ugandan, trusted worldwide. We bring international quality to the local market at competitive prices.",
                  delay: 0.2,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="group bg-white p-8 rounded-lg shadow-md text-center relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 + item.delay }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-lg p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 opacity-20 animate-gradient-x"></div>
                  </div>

                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission & Vision Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-16 md:py-24 bg-purple-50/50"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div variants={itemVariants} className="flex flex-col items-start">
                <Lightbulb className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-700">
                  To empower businesses and organizations in Uganda and beyond with cutting-edge creative and digital solutions that inspire, engage, and drive results. We strive to be your trusted technology partner in achieving digital transformation.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-start">
                <Rocket className="h-12 w-12 text-violet-600 mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-700">
                  To be the most trusted creative technology hub in Uganda, delivering world-class digital experiences that make brands unforgettable. We envision a future where Ugandan businesses compete globally through exceptional digital presence.
                </p>
              </motion.div>
            </div>
        {/* Values Strip */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Craft with care", desc: "Every pixel and line of code matters." },
                { title: "Think long‑term", desc: "Build for now—and what comes next." },
                { title: "Move together", desc: "Collaboration over silos, always." },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  className="rounded-xl border border-gray-100 bg-gradient-to-br from-purple-50 to-violet-50 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{v.title}</h4>
                  <p className="text-gray-600 text-sm">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

          </div>
        </motion.section>

        {/* Meet Our Team Section */}
        <motion.section
          id="team-section"
          ref={teamSectionRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="relative overflow-hidden bg-black py-24 md:py-32 text-white text-center"
        >
          {/* Shader Background */}
          <div className="absolute inset-0 z-0">
            <ShaderBackground />
          </div>

          <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8 z-10">
            <div className="mb-12">
              <Badge className="mb-4 bg-white/10 hover:bg-white/20 text-white" variant="outline">
                Team
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">The Minds Behind the Magic</h2>
              <p className="mx-auto max-w-2xl text-lg text-white/70 mb-8">
                Our diverse team brings together a wealth of experience, creativity, and technical expertise. Get to know the individuals who make Cave Motions thrive.
              </p>
              <Button
                size="lg"
                className="group bg-white text-black hover:bg-white/90"
                onClick={scrollToTeam}
              >
                Meet Our Team
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            <TeamSection />
          </div>
        </motion.section>



        {/* CTA Section */}
        <section className="relative overflow-hidden py-24 md:py-32 px-4 md:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-violet-800"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                initial={{
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0.1 + Math.random() * 0.3,
                }}
                animate={{
                  y: [
                    `calc(${Math.random() * 100}% - 10px)`,
                    `calc(${Math.random() * 100}% - 10px)`,
                    `calc(${Math.random() * 100}% - 10px)`,
                  ],
                  x: [
                    `calc(${Math.random() * 100}% - 10px)`,
                    `calc(${Math.random() * 100}% - 10px)`,
                    `calc(${Math.random() * 100}% - 10px)`,
                  ],
                  opacity: [0.1 + Math.random() * 0.3, 0.3 + Math.random() * 0.4, 0.1 + Math.random() * 0.3],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="container relative mx-auto max-w-6xl">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">🚀 Ready to take your business to the next level?</h2>
              <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8 text-white/80">
                Contact Cave Motions today for professional web design and creative solutions in Kampala. Let's transform your digital presence together.
              </p>
              <Button size="lg" className="group relative overflow-hidden bg-white text-purple-900 hover:bg-white/90">
                <span className="relative z-10 flex items-center">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-purple-100 to-purple-200 transition-all duration-300 group-hover:h-full"></span>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* About Page Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "Cave Motions",
              description:
                "Cave Motions is a leading technology agency in Kampala, Uganda, helping businesses transform through web design, software development, AI automation, branding, and motion design since 2018.",
              foundingDate: "2018",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bugolobi",
                addressLocality: "Kampala",
                addressCountry: "Uganda"
              },
              areaServed: "Uganda",
              numberOfEmployees: "10+",
              slogan: "Local Roots, Global Standards",
              url: "https://cavemotions.com",
              image: "https://cavemotions.com/images/team.jpg",
              serviceArea: "Kampala, Uganda",
              knowsAbout: ["Web Design", "Software Development", "AI Automation", "Mobile Applications", "Branding"]
            },
          }),
        }}
      />
    </>
  )
}
