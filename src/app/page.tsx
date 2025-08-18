import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🗑️</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Find Trash Nearby</h1>
                <p className="text-green-100">Keep our community clean together</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/map"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                View Map
              </Link>
              <Link
                href="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Find and Report Trash Locations
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Help keep our environment clean by locating and reporting trash in your area. 
            Together we can make a difference in our community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              🗺️ View Trash Map
            </Link>
            <Link
              href="/report"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              📍 Report New Trash
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Interactive Map</h3>
            <p className="text-green-100">
              View all reported trash locations on an interactive map with detailed information.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-white mb-2">Easy Reporting</h3>
            <p className="text-green-100">
              Report new trash locations with just a few clicks. Include photos and detailed descriptions.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
            <p className="text-green-100">
              Join the community effort to keep our environment clean and organized.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Community Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">0</div>
              <div className="text-green-100">Locations Reported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">0</div>
              <div className="text-green-100">Locations Cleaned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">0</div>
              <div className="text-green-100">Active Reports</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">0</div>
              <div className="text-green-100">Community Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
