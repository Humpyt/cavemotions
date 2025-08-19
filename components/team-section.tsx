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
    image: "/placeholder.svg?height=200&width=200&text=Humphrey+Todo",
    description:
      "Humphrey leads our product vision, ensuring every solution meets market needs and exceeds client expectations.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Isaac Obache",
    title: "Chief Technology Officer (CTO)",
    image: "/placeholder.svg?height=200&width=200&text=Isaac+Obache",
    description:
      "Isaac is the architect of our technical strategy, driving innovation and maintaining our high standards of engineering excellence.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Jonathan Elayo",
    title: "Head of Engineering",
    image: "/placeholder.svg?height=200&width=200&text=Jonathan+Elayo",
    description:
      "Jonathan oversees our engineering teams, fostering a culture of collaboration and continuous improvement.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Fred Oboth",
    title: "Product Designer / UX/UI Lead",
    image: "/placeholder.svg?height=200&width=200&text=Fred+Oboth",
    description:
      "Fred crafts intuitive and beautiful user experiences, ensuring our products are not just functional but delightful to use.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Stellahmaris Karungi",
    title: "Head of Marketing",
    image: "/placeholder.svg?height=200&width=200&text=Stellahmaris+Karungi",
    description:
      "Stellahmaris drives our brand's presence and connects us with clients, sharing the story of Cave Motions' impact.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
]

export default function TeamSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={cn(
              "relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl",
              "bg-white border border-gray-200 group",
              "transform hover:-translate-y-2",
            )}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <Link
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-300 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                    </Link>
                  )}
                  {member.social.twitter && (
                    <Link
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-300 transition-colors"
                    >
                      <Twitter className="h-6 w-6" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <CardHeader className="text-center pt-4 pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">{member.name}</CardTitle>
              <CardDescription className="text-purple-700 font-medium">{member.title}</CardDescription>
            </CardHeader>
            <CardContent className="text-center px-4 pb-6">
              <p className="text-sm text-gray-700 line-clamp-3">{member.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
