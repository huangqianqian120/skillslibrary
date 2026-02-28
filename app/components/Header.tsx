import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-100 sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-lg font-semibold text-gray-900">Skills Library</span>
          </Link>
          
          {/* Right Nav */}
          <nav className="flex items-center gap-4">
            <Link 
              href="/docs" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Doc
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
