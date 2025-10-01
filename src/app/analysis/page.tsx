import Link from 'next/link';

export default function AnalysisPage() {
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
            Position Analysis
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Analyze chess positions and get insights on the best moves
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 00-2 2H9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Coming Soon
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Position analysis features will be available once your Raspberry Pi integration is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}