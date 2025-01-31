import Link from 'next/link'
import UrlInput from '../components/UrlInput'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-600 mb-6">
            Measure globally
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Measure your website with Lighthouse Buddy across the globe
          </p>
          <div className="mb-8">
            <UrlInput />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">Get Lighthouse Scores</h3>
              <p className="text-gray-600">
                Understand how your site is performing
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">16 regions worldwide</h3>
              <p className="text-gray-600">
                Measure and view your site&apos;s performance score across the world. Run Lighthouse from up to 16 regions with a single test.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">Test History</h3>
              <p className="text-gray-600">
                Access and compare previous test results. View past Lighthouse reports and see how your site has changed over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-600 mb-6">Programmatic Access</h2>
              <p className="text-gray-600 mb-8">
                Integrate Lighthouse into your CI/CD pipeline. Run Lighthouse tests programmatically and automate your performance testing through the API.
              </p>
              <Link href="/api" className="btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <pre className="text-gray-300 overflow-x-auto">
                {JSON.stringify({
                  url: "https://www.example.com",
                  regions: ["us-west1"]
                }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
