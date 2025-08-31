"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "Humphrey Todo",
    title: "Team Lead / Head of Product",
    image: "/images/team/Todo Humphrey2.jpg",
    description:
      "A visionary leader with an eye for innovation, Humphrey transforms complex business challenges into elegant digital solutions. His strategic mindset and passion for technology drive Cave Motions' mission to deliver exceptional products that make a real difference in our clients' success stories.",
  },
  {
    name: "Stellahmaris Karungi",
    title: "Head of Marketing",
    image: "/images/team/Stella Karungi.jpg",
    description:
      "The storyteller of our brand, Stellahmaris weaves compelling narratives that connect Cave Motions with the world. Her strategic marketing vision and authentic communication style help businesses discover how technology can transform their dreams into digital reality.",
  },
  {
    name: "Isaac Obache",
    title: "Chief Technology Officer (CTO)",
    image: "/images/team/Isaac Obache.jpg",
    description:
      "The mastermind behind our technical excellence, Isaac combines deep engineering expertise with forward-thinking innovation. He architects scalable solutions that power tomorrow's digital landscape, ensuring every line of code contributes to building the future we envision.",
  },
  {
    name: "Jonathan Elayo",
    title: "Head of Engineering",
    image: "/images/team/Jonatha Elayo.jpg",
    description:
      "A collaborative leader who believes great software is built by great teams, Jonathan cultivates an environment where creativity meets precision. His mentorship and technical guidance transform ambitious ideas into robust, scalable applications that exceed expectations.",
  },
  {
    name: "Fred Oboth",
    title: "Product Designer / UX/UI Lead",
    image: "/images/team/Oboth Fred.jpg",
    description:
      "Where art meets functionality, Fred creates digital experiences that captivate and inspire. His design philosophy centers on human-centered innovation, crafting interfaces that feel intuitive, look stunning, and solve real problems with elegant simplicity.",
  },
]

export default function TeamSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.08 }}
        >
          <Card
            className={cn(
              "group relative h-full overflow-hidden border-0 bg-white/10 backdrop-blur-sm shadow-xl transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl border border-white/10",
            )}
          >

            <div className="relative h-48 w-full overflow-hidden rounded-2xl">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex space-x-3">
                  <div className="text-white/70">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div className="text-white/70">
                    <Twitter className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
            <CardHeader className="text-center pt-4 pb-2">
              <CardTitle className="text-xl font-bold text-white">{member.name}</CardTitle>
              <CardDescription className="text-white/70">{member.title}</CardDescription>
            </CardHeader>
            <CardContent className="text-center px-4 pb-6">
              <p className="text-sm text-white/70 line-clamp-3">{member.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
