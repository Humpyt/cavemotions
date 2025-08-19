import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Cave Motions",
  description: "Privacy Policy for Cave Motions - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-violet-800 text-white">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            At Cave Motions, we take your privacy seriously. This policy outlines how we collect, use, and protect your
            personal information.
          </p>
          <div className="mt-8">
            <Link href="/" className="inline-flex items-center text-white hover:text-purple-200 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="prose prose-purple max-w-none">
          <div className="bg-purple-50 p-6 rounded-lg mb-10 border border-purple-100">
            <p className="text-sm text-purple-800 mb-0">
              <strong>Last Updated:</strong> April 20, 2025
            </p>
          </div>

          <h2>1. Introduction</h2>
          <p>
            Cave Motions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you visit our website, use our services,
            or interact with us in any way.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have
            read, understood, and agree to be bound by all the terms outlined in this policy. If you do not agree with
            our policies and practices, please do not use our services.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Register for an account</li>
            <li>Sign up for our newsletter</li>
            <li>Fill out a contact form</li>
            <li>Request a quote or consultation</li>
            <li>Participate in surveys or promotions</li>
            <li>Engage with our content or services</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company name</li>
            <li>Job title</li>
            <li>Billing information</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>
            When you visit our website or use our services, we may automatically collect certain information about your
            device and usage patterns. This information may include:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device information</li>
            <li>Pages visited and time spent on those pages</li>
            <li>Referring website addresses</li>
            <li>Click patterns and interactions</li>
          </ul>

          <h3>2.3 Cookies and Similar Technologies</h3>
          <p>
            We use cookies, web beacons, pixels, and similar tracking technologies to collect information about your
            browsing activities. These technologies help us analyze website traffic, customize content, and improve your
            experience. For more information about our use of cookies, please see our Cookie Policy.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing, maintaining, and improving our services</li>
            <li>Processing transactions and fulfilling orders</li>
            <li>Responding to your inquiries and requests</li>
            <li>Sending administrative information, such as updates, security alerts, and support messages</li>
            <li>Sending marketing communications, newsletters, and promotional materials</li>
            <li>Personalizing your experience and delivering tailored content</li>
            <li>Analyzing usage patterns and trends to improve our website and services</li>
            <li>Protecting against, identifying, and preventing fraud and other illegal activities</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information with third-party vendors, service
              providers, contractors, or agents who perform services on our behalf.
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, financing, or sale of
              assets, your information may be transferred as part of that transaction.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in
              response to valid requests by public authorities.
            </li>
            <li>
              <strong>Protection of Rights:</strong> We may disclose your information to protect our rights, privacy,
              safety, or property, as well as that of our users or others.
            </li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please be aware that no method of transmission over the Internet or electronic storage
            is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>6. Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Accessing, correcting, or deleting your personal information</li>
            <li>Objecting to or restricting the processing of your personal information</li>
            <li>Requesting a copy of your personal information in a structured, machine-readable format</li>
            <li>Withdrawing consent at any time, where we rely on consent to process your information</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.
          </p>

          <h2>7. International Data Transfers</h2>
          <p>
            Your information may be transferred to, and processed in, countries other than the country in which you
            reside. These countries may have data protection laws that differ from those in your country. By using our
            services, you consent to the transfer of your information to these countries.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal
            information from children. If we learn that we have collected personal information from a child, we will
            take steps to delete that information as soon as possible.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other
            operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated
            policy on this page and updating the "Last Updated" date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
            please contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
            <p className="mb-1">
              <strong>Cave Motions</strong>
            </p>
            <p className="mb-1">Bugolobi, Kampala, Uganda</p>
            <p className="mb-1">Email: info@cavemotions.com</p>
            <p className="mb-0">Phone: +256 787 022105</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
