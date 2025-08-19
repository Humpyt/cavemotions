import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | Cave Motions",
  description:
    "Terms of Service for Cave Motions - Learn about the terms and conditions governing the use of our services.",
}

export default function TermsOfServicePage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-violet-800 text-white">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            These terms and conditions outline the rules and regulations for the use of Cave Motions' services and
            website.
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
            Welcome to Cave Motions. By accessing our website at{" "}
            <Link href="/" className="text-purple-600 hover:text-purple-800">
              www.cavemotions.com
            </Link>{" "}
            or using our services, you agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and
            any additional terms and conditions that may apply to specific sections of our website or services.
          </p>
          <p>
            These Terms apply to all users of the site, including without limitation users who are browsers, vendors,
            customers, merchants, and/or contributors of content. Please read these Terms carefully before accessing or
            using our website or services. By accessing or using any part of the site, you agree to be bound by these
            Terms. If you do not agree to all the terms and conditions of this agreement, then you may not access the
            website or use any services.
          </p>

          <h2>2. Services</h2>
          <p>Cave Motions provides various digital services, including but not limited to:</p>
          <ul>
            <li>AI Automation</li>
            <li>Web Development</li>
            <li>Software Development</li>
            <li>Mobile Applications</li>
            <li>UI/UX Design</li>
          </ul>
          <p>
            The specific details, deliverables, timelines, and costs for each service will be outlined in a separate
            agreement or statement of work between Cave Motions and the client.
          </p>

          <h2>3. Intellectual Property Rights</h2>

          <h3>3.1 Our Intellectual Property</h3>
          <p>
            The content on our website, including without limitation text, graphics, logos, icons, images, audio clips,
            digital downloads, data compilations, and software, is the property of Cave Motions or its content suppliers
            and is protected by international copyright laws. The compilation of all content on this site is the
            exclusive property of Cave Motions and is protected by international copyright laws.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior
            written consent of Cave Motions.
          </p>

          <h3>3.2 Client Materials</h3>
          <p>
            When you provide us with materials, content, or information for use in the development of your project, you
            represent and warrant that you own or have the necessary rights to use and authorize us to use the materials
            in connection with our services.
          </p>

          <h3>3.3 Ownership of Deliverables</h3>
          <p>
            Unless otherwise specified in a separate agreement, upon full payment of all applicable fees, the client
            will own the final deliverables provided by Cave Motions. However, Cave Motions retains ownership of all
            preliminary designs and concepts that are not selected as final deliverables.
          </p>
          <p>
            Cave Motions reserves the right to display and link to the completed project as part of our portfolio and to
            write about the project on websites, in magazine articles, and in books about design.
          </p>

          <h2>4. User Responsibilities</h2>

          <h3>4.1 Account Information</h3>
          <p>
            If you create an account with us, you are responsible for maintaining the confidentiality of your account
            and password and for restricting access to your computer. You agree to accept responsibility for all
            activities that occur under your account or password.
          </p>

          <h3>4.2 Prohibited Activities</h3>
          <p>
            You may not use our website or services for any illegal or unauthorized purpose. You must not, in the use of
            the service, violate any laws in your jurisdiction (including but not limited to copyright laws).
          </p>
          <p>You agree not to:</p>
          <ul>
            <li>Use our services to transmit any malware, spyware, or other malicious code</li>
            <li>Interfere with or disrupt the integrity or performance of our services</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Use our services for any illegal or unauthorized purpose</li>
          </ul>

          <h2>5. Payment Terms</h2>
          <p>
            Payment terms for our services will be outlined in a separate agreement or statement of work. Unless
            otherwise specified, all invoices are due upon receipt. Late payments may incur additional fees or result in
            the suspension of services.
          </p>
          <p>
            We accept payment via bank transfer, credit card, and other methods as specified in our invoices. All fees
            are non-refundable unless otherwise specified in a separate agreement.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Cave Motions shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting
            from:
          </p>
          <ul>
            <li>Your use or inability to use our services</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from our services</li>
            <li>
              Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services by any
              third party
            </li>
          </ul>
          <p>
            In no event shall our total liability to you for all claims exceed the amount paid by you to Cave Motions
            for the services giving rise to the claim.
          </p>

          <h2>7. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Cave Motions, its officers, directors, employees, and
            agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and
            expenses (including but not limited to attorney's fees) arising from:
          </p>
          <ul>
            <li>Your use of and access to our services</li>
            <li>Your violation of any term of these Terms</li>
            <li>
              Your violation of any third-party right, including without limitation any copyright, property, or privacy
              right
            </li>
            <li>Any claim that your content caused damage to a third party</li>
          </ul>

          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your access to our services immediately, without prior notice or liability, for
            any reason whatsoever, including without limitation if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use our services will immediately cease. If you wish to terminate your
            account, you may simply discontinue using our services.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of Uganda, without regard to its
            conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by
            posting the new Terms on this page and updating the "Last Updated" date.
          </p>
          <p>
            By continuing to access or use our services after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using our services.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
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
