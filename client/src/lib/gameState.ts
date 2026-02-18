/**
 * Game State Management
 * 
 * Handles game logic, state persistence, and user profile management
 * Uses LocalStorage for offline persistence
 */

export type GameMode = 'ai' | 'local' | 'online';
export type GameStatus = 'idle' | 'searching' | 'playing' | 'finished';
export type Difficulty = 'easy' | 'medium' | 'insane';

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  wins: number;
  losses: number;
  draws: number;
  level: number;
  xp: number;
  rank: number;
  createdAt: number;
}

export interface GameSession {
  id: string;
  mode: GameMode;
  difficulty: Difficulty;
  status: GameStatus;
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  playerSymbol: 'X' | 'O';
  opponent: {
    id: string;
    username: string;
    avatar: string;
  };
  startedAt: number;
  finishedAt?: number;
  winner?: 'X' | 'O' | 'draw';
  winningLine?: number[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  wins: number;
  level: number;
  xp: number;
}

const STORAGE_KEYS = {
  USER_PROFILE: 'gamesr_user_profile',
  GAME_SESSION: 'gamesr_game_session',
  LEADERBOARD: 'gamesr_leaderboard',
  GAME_HISTORY: 'gamesr_game_history',
};

/**
 * Generate a unique ID
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Generate a random avatar (using initials + color)
 */
function generateAvatar(username: string): string {
  const initials = username.substring(0, 2).toUpperCase();
  const colors = ['6366F1', 'EC4899', '14B8A6', 'F59E0B', '8B5CF6'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `https://ui-avatars.com/api/?name=${initials}&background=${color}&color=fff&rounded=true`;
}

/**
 * Initialize or retrieve user profile
 */
export function initializeUserProfile(): UserProfile {
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);

  if (stored) {
    return JSON.parse(stored);
  }

  const profile: UserProfile = {
    id: generateId(),
    username: `Guest_${generateId().substring(0, 4)}`,
    avatar: generateAvatar(`Guest_${generateId().substring(0, 4)}`),
    wins: 0,
    losses: 0,
    draws: 0,
    level: 1,
    xp: 0,
    rank: 1000,
    createdAt: Date.now(),
  };

  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  return profile;
}

/**
 * Update user profile (username, stats)
 */
export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  const current = initializeUserProfile();
  const updated = { ...current, ...updates };

  // Sanitize username
  if (updates.username) {
    updated.username = updates.username
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .substring(0, 20);
    updated.avatar = generateAvatar(updated.username);
  }

  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
  return updated;
}

/**
 * Create a new game session
 */
export function createGameSession(
  mode: GameMode,
  difficulty: Difficulty = 'insane'
): GameSession {
  const session: GameSession = {
    id: generateId(),
    mode,
    difficulty,
    status: 'idle',
    board: Array(9).fill(null),
    currentPlayer: 'X',
    playerSymbol: 'X',
    opponent: {
      id: generateId(),
      username: mode === 'ai' ? 'AI Opponent' : 'Player 2',
      avatar:
        mode === 'ai'
          ? 'https://ui-avatars.com/api/?name=AI&background=6366F1&color=fff&rounded=true'
          : generateAvatar('Player 2'),
    },
    startedAt: Date.now(),
  };

  localStorage.setItem(STORAGE_KEYS.GAME_SESSION, JSON.stringify(session));
  return session;
}

/**
 * Get current game session
 */
export function getGameSession(): GameSession | null {
  const stored = localStorage.getItem(STORAGE_KEYS.GAME_SESSION);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Update game session
 */
export function updateGameSession(updates: Partial<GameSession>): GameSession {
  const current = getGameSession();
  if (!current) throw new Error('No active game session');

  const updated = { ...current, ...updates };
  localStorage.setItem(STORAGE_KEYS.GAME_SESSION, JSON.stringify(updated));
  return updated;
}

/**
 * Clear game session
 */
export function clearGameSession(): void {
  localStorage.removeItem(STORAGE_KEYS.GAME_SESSION);
}

/**
 * Get leaderboard (mock data for now)
 */
export function getLeaderboard(): LeaderboardEntry[] {
  const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);

  if (stored) {
    return JSON.parse(stored);
  }

  // Mock leaderboard data
  const mockLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      userId: 'user_001',
      username: 'ProGamer',
      avatar: 'https://ui-avatars.com/api/?name=PG&background=6366F1&color=fff&rounded=true',
      wins: 342,
      level: 45,
      xp: 125000,
    },
    {
      rank: 2,
      userId: 'user_002',
      username: 'MasterMind',
      avatar: 'https://ui-avatars.com/api/?name=MM&background=EC4899&color=fff&rounded=true',
      wins: 298,
      level: 42,
      xp: 118500,
    },
    {
      rank: 3,
      userId: 'user_003',
      username: 'StrategyKing',
      avatar: 'https://ui-avatars.com/api/?name=SK&background=14B8A6&color=fff&rounded=true',
      wins: 267,
      level: 39,
      xp: 110200,
    },
    {
      rank: 4,
      userId: 'user_004',
      username: 'TacticMaster',
      avatar: 'https://ui-avatars.com/api/?name=TM&background=F59E0B&color=fff&rounded=true',
      wins: 245,
      level: 36,
      xp: 102800,
    },
    {
      rank: 5,
      userId: 'user_005',
      username: 'GameWizard',
      avatar: 'https://ui-avatars.com/api/?name=GW&background=8B5CF6&color=fff&rounded=true',
      wins: 218,
      level: 33,
      xp: 95400,
    },
  ];

  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(mockLeaderboard));
  return mockLeaderboard;
}

/**
 * Record game result and update stats
 */
export function recordGameResult(
  result: 'win' | 'loss' | 'draw',
  xpGained: number = 10
): UserProfile {
  const profile = initializeUserProfile();

  const updates: Partial<UserProfile> = {
    xp: profile.xp + xpGained,
  };

  if (result === 'win') {
    updates.wins = profile.wins + 1;
  } else if (result === 'loss') {
    updates.losses = profile.losses + 1;
  } else {
    updates.draws = profile.draws + 1;
  }

  // Calculate level (every 100 XP = 1 level)
  updates.level = Math.floor(updates.xp! / 100) + 1;

  // Calculate rank based on wins
  updates.rank = Math.max(1, 1000 - profile.wins);

  return updateUserProfile(updates);
}

/**
 * Get game history
 */
export function getGameHistory(): GameSession[] {
  const stored = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Add game to history
 */
export function addToGameHistory(session: GameSession): void {
  const history = getGameHistory();
  history.push(session);

  // Keep only last 50 games
  if (history.length > 50) {
    history.shift();
  }

  localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(history));
}

/**
 * Clear all data (for testing)
 */
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
