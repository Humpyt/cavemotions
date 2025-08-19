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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
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
        <section
          className="relative overflow-hidden py-24 md:py-32 lg:py-40 text-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920&text=About+Us+Background')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-violet-800/70" />
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
              className="text-lg md:text-xl max-w-4xl mx-auto opacity-90 text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Leading technology agency in Kampala, Uganda, helping businesses transform through web design, software development, AI automation, branding, and motion design since 2018.
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

        {/* Our Story Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-700 mb-4">
                Based in Bugolobi, Kampala, Cave Motions combines creativity with technology to deliver results that stand out. Since 2018, our team of designers, developers, and strategists has delivered innovative digital solutions that empower brands to grow.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We specialize in:
              </p>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 shrink-0" />
                  Custom web design in Kampala
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 shrink-0" />
                  Software development
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 shrink-0" />
                  AI automation for businesses
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 shrink-0" />
                  Mobile Applications development
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Image
                src="/placeholder.svg?height=400&width=600&text=Our+Story"
                alt="Our Story"
                width={600}
                height={400}
                className="rounded-xl shadow-xl object-cover w-full h-auto"
              />
            </motion.div>
          </div>
        </motion.section>

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
              <Badge className="mb-4" variant="purple">
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
          </div>
        </motion.section>

        {/* Meet Our Team Section */}
        <motion.section
          id="team-section" // Add ID for scrolling
          ref={teamSectionRef} // Attach ref
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-16 md:py-24 text-center"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <Users className="h-16 w-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Minds Behind the Magic</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Our diverse team brings together a wealth of experience, creativity, and technical expertise. Get to know
              the individuals who make Cave Motions thrive.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg"
              onClick={scrollToTeam} // Use onClick for scrolling
            >
              Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <TeamSection /> {/* Render the new TeamSection component */}
          </div>
        </motion.section>

        {/* Our Commitment */}
        <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          {/* Background gradient blobs */}
          <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-purple-100/50 blur-3xl opacity-30"></div>
          <div className="absolute bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl opacity-30"></div>

          <div className="container mx-auto max-w-6xl relative">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={0}
                  variants={fadeInUpVariants}
                >
                  <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
                    Our Commitment
                    <motion.span
                      className="absolute -bottom-2 left-0 h-1 w-0 bg-gradient-to-r from-purple-400 to-violet-400"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </h2>
                </motion.div>

                <motion.p
                  className="text-lg text-gray-600"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={1}
                  variants={fadeInUpVariants}
                >
                  At Cave Motions, you're not just another client—you're our next big adventure in digital
                  transformation. We're committed to:
                </motion.p>

                <ul className="space-y-4">
                  {[
                    {
                      title: "Delivering innovative and reliable solutions",
                      description:
                        "We create digital solutions that not only look good but also perform exceptionally well.",
                      delay: 0,
                    },
                    {
                      title: "Listening closely to your needs",
                      description:
                        "We take the time to understand your business goals and challenges before proposing solutions.",
                      delay: 0.1,
                    },
                    {
                      title: "Adding personality to every project",
                      description: "We believe technology should have character—just like the people who use it.",
                      delay: 0.2,
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      custom={index + 2}
                      variants={fadeInUpVariants}
                    >
                      <div className="group">
                        <CheckCircle className="h-6 w-6 text-purple-700 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <ThreeDimensionalCard>
                  <img
                    src="/placeholder.svg?height=400&width=500&text=Our Values"
                    alt="Cave Motions values"
                    className="rounded-lg shadow-xl"
                  />
                </ThreeDimensionalCard>
              </motion.div>
            </div>
          </div>
        </section>

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
                  Start Your Project
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
