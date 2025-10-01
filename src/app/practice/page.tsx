import Link from 'next/link';

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Practice
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Practice tactical puzzles and improve your pattern recognition skills
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Coming Soon
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Practice features will be available once your Raspberry Pi integration is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}