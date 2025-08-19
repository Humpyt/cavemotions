import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy | Cave Motions",
  description: "Cookie Policy for Cave Motions - Learn how we use cookies and similar technologies on our website.",
}

export default function CookiePolicyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-violet-800 text-white">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            This Cookie Policy explains how Cave Motions uses cookies and similar technologies to recognize you when you
            visit our website.
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

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well
            as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Cave Motions) are called "first-party cookies." Cookies set
            by parties other than the website owner are called "third-party cookies." Third-party cookies enable
            third-party features or functionality to be provided on or through the website (e.g., advertising,
            interactive content, and analytics).
          </p>

          <h2>2. Types of Cookies We Use</h2>

          <h3>2.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable basic functions like page
            navigation and access to secure areas of the website. The website cannot function properly without these
            cookies.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Cookie Name
                  </th>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Purpose
                  </th>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">XSRF-TOKEN</td>
                  <td className="py-3 px-4">Security - Helps prevent Cross-Site Request Forgery attacks</td>
                  <td className="py-3 px-4">Session</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">session</td>
                  <td className="py-3 px-4">Authentication - Maintains your login session</td>
                  <td className="py-3 px-4">2 weeks</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">cookie_consent</td>
                  <td className="py-3 px-4">Functionality - Remembers your cookie consent preferences</td>
                  <td className="py-3 px-4">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">2.2 Performance Cookies</h3>
          <p>
            These cookies collect information about how visitors use a website, for instance which pages visitors go to
            most often, and if they get error messages from web pages. These cookies don't collect information that
            identifies a visitor. All information these cookies collect is aggregated and therefore anonymous.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Cookie Name
                  </th>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Purpose
                  </th>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">_ga</td>
                  <td className="py-3 px-4">Analytics - Used by Google Analytics to distinguish users</td>
                  <td className="py-3 px-4">2 years</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">_gid</td>
                  <td className="py-3 px-4">Analytics - Used by Google Analytics to distinguish users</td>
                  <td className="py-3 px-4">24 hours</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">_gat</td>
                  <td className="py-3 px-4">Analytics - Used by Google Analytics to throttle request rate</td>
                  <td className="py-3 px-4">1 minute</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">2.3 Functionality Cookies</h3>
          <p>
            These cookies allow the website to remember choices you make (such as your username, language, or the region
            you are in) and provide enhanced, more personal features.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Cookie Name
                  </th>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Purpose
                  </th>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">language</td>
                  <td className="py-3 px-4">Functionality - Remembers your preferred language</td>
                  <td className="py-3 px-4">1 year</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">theme</td>
                  <td className="py-3 px-4">Functionality - Remembers your preferred theme (light/dark)</td>
                  <td className="py-3 px-4">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">2.4 Targeting Cookies</h3>
          <p>
            These cookies are used to deliver advertisements more relevant to you and your interests. They are also used
            to limit the number of times you see an advertisement as well as help measure the effectiveness of the
            advertising campaign.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Cookie Name
                  </th>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Purpose
                  </th>
                  <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">_fbp</td>
                  <td className="py-3 px-4">Marketing - Used by Facebook to deliver advertisements</td>
                  <td className="py-3 px-4">3 months</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">_gcl_au</td>
                  <td className="py-3 px-4">
                    Marketing - Used by Google AdSense for experimenting with advertisement efficiency
                  </td>
                  <td className="py-3 px-4">3 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-10">3. How to Control Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
            computer and you can set most browsers to prevent them from being placed. If you do this, however, you may
            have to manually adjust some preferences every time you visit a site and some services and functionalities
            may not work.
          </p>
          <p>
            Most web browsers allow some control of most cookies through the browser settings. To find out more about
            cookies, including how to see what cookies have been set and how to manage and delete them, visit{" "}
            <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
              www.allaboutcookies.org
            </a>
            .
          </p>

          <h3>Browser Settings</h3>
          <p>
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies,
            or to alert you when cookies are being sent. The following links show how to adjust the cookie settings on
            commonly used browsers:
          </p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h3>Cookie Consent Tool</h3>
          <p>
            When you first visit our website, you will be presented with a cookie banner that allows you to accept or
            decline non-essential cookies. You can change your preferences at any time by clicking on the "Cookie
            Settings" link in the footer of our website.
          </p>

          <h2>4. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
            business practices. Any changes will become effective when we post the revised policy on this page. We
            encourage you to periodically review this page for the latest information on our cookie practices.
          </p>

          <h2>5. Contact Us</h2>
          <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us at:</p>
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
