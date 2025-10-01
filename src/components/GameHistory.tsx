'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ChessGame {
  id: string;
  date: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  playerColor: 'white' | 'black';
  moves: number;
  timeControl: string;
  opening: string;
  rating: number;
  opponentRating: number;
}

// Mock data - this would come from your Raspberry Pi
const mockGames: ChessGame[] = [
  {
    id: '1',
    date: '2024-01-15',
    opponent: 'ChessMaster2000',
    result: 'win',
    playerColor: 'white',
    moves: 32,
    timeControl: '10+0',
    opening: 'Sicilian Defense',
    rating: 1547,
    opponentRating: 1523
  },
  {
    id: '2',
    date: '2024-01-14',
    opponent: 'KnightRider',
    result: 'loss',
    playerColor: 'black',
    moves: 28,
    timeControl: '15+10',
    opening: 'Queen\'s Gambit',
    rating: 1535,
    opponentRating: 1598
  },
  {
    id: '3',
    date: '2024-01-14',
    opponent: 'PawnStorm',
    result: 'draw',
    playerColor: 'white',
    moves: 45,
    timeControl: '5+3',
    opening: 'English Opening',
    rating: 1540,
    opponentRating: 1542
  },
  {
    id: '4',
    date: '2024-01-13',
    opponent: 'RookiePlayer',
    result: 'win',
    playerColor: 'black',
    moves: 24,
    timeControl: '10+0',
    opening: 'French Defense',
    rating: 1532,
    opponentRating: 1489
  },
  {
    id: '5',
    date: '2024-01-12',
    opponent: 'BishopBlitz',
    result: 'win',
    playerColor: 'white',
    moves: 36,
    timeControl: '3+2',
    opening: 'Italian Game',
    rating: 1521,
    opponentRating: 1507
  }
];

export default function GameHistory() {
  const [games] = useState<ChessGame[]>(mockGames);
  const [filter, setFilter] = useState<'all' | 'win' | 'loss' | 'draw'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'moves'>('date');

  const getResultColor = (result: ChessGame['result']) => {
    switch (result) {
      case 'win': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'loss': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'draw': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    }
  };

  const getResultIcon = (result: ChessGame['result']) => {
    switch (result) {
      case 'win': return '✓';
      case 'loss': return '✗';
      case 'draw': return '=';
    }
  };

  const filteredGames = games.filter(game => 
    filter === 'all' || game.result === filter
  );

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'moves':
        return b.moves - a.moves;
      default:
        return 0;
    }
  });

  const stats = {
    total: games.length,
    wins: games.filter(g => g.result === 'win').length,
    losses: games.filter(g => g.result === 'loss').length,
    draws: games.filter(g => g.result === 'draw').length,
    winRate: Math.round((games.filter(g => g.result === 'win').length / games.length) * 100)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Game History
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Review your past games and track your progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.total}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Games</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.wins}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Wins</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.losses}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Losses</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.draws}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Draws</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.winRate}%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Win Rate</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 self-center mr-2">Filter:</span>
              {(['all', 'win', 'loss', 'draw'] as const).map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === filterOption
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'moves')}
                className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="date">Date</option>
                <option value="rating">Rating</option>
                <option value="moves">Moves</option>
              </select>
            </div>
          </div>
        </div>

        {/* Games List */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Opponent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Color
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Opening
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Moves
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                {sortedGames.map((game) => (
                  <tr key={game.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getResultColor(game.result)}`}>
                        {getResultIcon(game.result)} {game.result.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      {new Date(game.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-slate-200">
                      {game.opponent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      <div className={`w-4 h-4 rounded-full inline-block mr-2 ${
                        game.playerColor === 'white' ? 'bg-gray-100 border-2 border-gray-400' : 'bg-gray-800'
                      }`}></div>
                      {game.playerColor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      {game.opening}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      {game.moves}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      {game.rating} vs {game.opponentRating}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        href={`/game/${game.id}`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Analyze
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {sortedGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-4">No games found</div>
            <p className="text-slate-600 dark:text-slate-400">
              {filter !== 'all' ? 'Try adjusting your filter settings.' : 'Connect your Raspberry Pi to sync your games.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}