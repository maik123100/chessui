'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RaspberryPiConfig {
  ip: string;
  connected: boolean;
}

export default function Dashboard() {
  const [piConfig, setPiConfig] = useState<RaspberryPiConfig>({ 
    ip: '', 
    connected: false 
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!piConfig.ip) return;
    
    setIsConnecting(true);
    try {
      // Simulate connection attempt - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPiConfig(prev => ({ ...prev, connected: true }));
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setPiConfig({ ip: piConfig.ip, connected: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Chess Tutor
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Analyze your chess games and improve your play with data from your Raspberry Pi home project
          </p>
        </div>

        {/* Raspberry Pi Connection Card */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
              <div className="w-3 h-3 rounded-full mr-3 bg-red-500 animate-pulse"></div>
              Raspberry Pi Connection
            </h2>
            
            {!piConfig.connected ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="pi-ip" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Raspberry Pi IP Address
                  </label>
                  <input
                    id="pi-ip"
                    type="text"
                    placeholder="192.168.1.100"
                    value={piConfig.ip}
                    onChange={(e) => setPiConfig(prev => ({ ...prev, ip: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
                  />
                </div>
                <button
                  onClick={handleConnect}
                  disabled={!piConfig.ip || isConnecting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Connected to:</p>
                    <p className="font-mono text-slate-800 dark:text-slate-100">{piConfig.ip}</p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border text-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Total Games</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">247</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border text-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Win Rate</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">68%</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border text-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Current Rating</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">1547</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/games" className="group">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Game History</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                View and analyze your past games with detailed statistics and move analysis.
              </p>
            </div>
          </Link>

          <Link href="/analysis" className="group">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 00-2 2H9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Position Analysis</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                Analyze specific positions and get insights on the best moves and strategies.
              </p>
            </div>
          </Link>

          <Link href="/practice" className="group">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Practice</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                Practice tactical puzzles and improve your pattern recognition skills.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}