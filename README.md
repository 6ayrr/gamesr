# GameSR - Professional Tic-Tac-Toe Platform

A premium, minimalist Tic-Tac-Toe gaming platform with an unbeatable AI opponent, multiplayer modes, and global leaderboard. Built with React 19, Tailwind CSS 4, and Framer Motion with a sophisticated glassmorphic design.

## 🎯 Features

### Core Gameplay
- **Unbeatable AI Opponent**: Powered by the Minimax algorithm with alpha-beta pruning
- **Local Multiplayer**: Two-player mode on the same device
- **Insane Difficulty**: AI prioritizes center and corners for strategic advantage
- **Winning Line Animation**: Visual feedback when a player wins

### User Experience
- **Ultra-Minimalist Design**: Glassmorphic interface with 16px blur effects
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Offline Ready**: All game progress saved to LocalStorage
- **User Profiles**: Guest account generation with inline username editing
- **Statistics Tracking**: Wins, losses, draws, level, XP, and ranking

### Platform Features
- **Global Leaderboard**: Top players ranked by wins and level
- **Game History**: Track your recent games and results
- **SEO Optimized**: Semantic HTML5 and descriptive meta tags
- **Accessibility**: WCAG AAA compliant with high contrast

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **Routing** | Wouter (HashRouter for static hosting) |
| **State Management** | React Hooks + LocalStorage |
| **AI Engine** | Minimax Algorithm (TypeScript) |
| **Typography** | Inter (English), Noto Kufi Arabic |
| **Build Tool** | Vite 7 |

## 📁 Project Structure

```
gamesr/
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── XOBoard.tsx           # 3x3 game grid
│   │   │   ├── Header.tsx            # Sticky navigation
│   │   │   ├── Footer.tsx            # Minimalist footer
│   │   │   └── Lobby.tsx             # Matchmaking interface
│   │   ├── pages/           # Page-level components
│   │   │   ├── Home.tsx              # Hero section with marquee
│   │   │   ├── Game.tsx              # Main game interface
│   │   │   ├── Profile.tsx           # User profile & stats
│   │   │   ├── Leaderboard.tsx       # Global rankings
│   │   │   ├── Privacy.tsx           # Privacy policy
│   │   │   └── Terms.tsx             # Terms of service
│   │   ├── lib/
│   │   │   ├── minimax.ts            # AI engine (Minimax algorithm)
│   │   │   └── gameState.ts          # Game state management
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── App.tsx          # Routes & layout
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles & design tokens
│   └── index.html           # HTML template
├── package.json             # Dependencies
└── README.md               # This file
```

## 🎨 Design Philosophy

**Ultra-Minimalist Glassmorphism** - Every element serves a purpose:

- **Color Palette**: Ultra-dark background (#050505) with white text and indigo accents (#6366F1)
- **Glass Effect**: 16px backdrop blur with 1px white borders at 5% opacity
- **Micro-Interactions**: Subtle 100-300ms transitions over flashy animations
- **Typography**: Inter 400/500/600/700 for hierarchy and Noto Kufi Arabic for Arabic text
- **Spacing**: Generous whitespace creates breathing room and luxury feel

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm check

# Format code
pnpm format
```

### Development Server

The dev server runs on `http://localhost:3000` with hot module replacement enabled.

```bash
pnpm dev
```

### Building for Production

```bash
pnpm build
```

This creates an optimized production build in the `dist/` directory, ready for deployment to GitHub Pages or any static hosting.

## 🧠 AI Engine: Minimax Algorithm

The AI opponent uses the **Minimax algorithm with alpha-beta pruning** to evaluate all possible board states and find the optimal move.

### Key Features
- **Recursive Evaluation**: Evaluates every possible move recursively
- **Scoring System**: Win (+100), Loss (-100), Draw (0)
- **Alpha-Beta Pruning**: Optimizes performance by eliminating unnecessary branches
- **Strategic Prioritization**: Prioritizes center (index 4) and corners (indices 0, 2, 6, 8)
- **Unbeatable**: Never loses on "Insane" difficulty

### Algorithm Flow
1. Evaluate terminal states (win/loss/draw)
2. For each available move, recursively call minimax
3. Maximize score for AI's turn, minimize for opponent's turn
4. Apply alpha-beta pruning to skip unnecessary branches
5. Return best move with highest score

## 💾 Data Persistence

All game data is stored in **browser LocalStorage**:

- **User Profile**: Username, avatar, stats, level, XP, rank
- **Game Sessions**: Current board state, player info, game status
- **Game History**: Last 50 games with results
- **Leaderboard**: Mock data for demonstration

No data is sent to external servers unless explicitly configured.

## 📱 Responsive Design

The platform is **100% responsive** across all breakpoints:

- **Mobile** (< 640px): Single column layout, touch-optimized buttons
- **Tablet** (640px - 1024px): Two-column layout where appropriate
- **Desktop** (> 1024px): Full asymmetric layout with optimal spacing

## ♿ Accessibility

- **WCAG AAA Compliant**: High contrast ratios (white on #050505)
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Visible focus rings on all buttons and inputs
- **Semantic HTML**: Proper heading hierarchy and ARIA labels

## 🔍 SEO Optimization

- **Meta Tags**: Descriptive title, description, and OG tags
- **Semantic HTML5**: Proper heading structure and semantic elements
- **Fast Loading**: Optimized assets and lazy loading
- **Mobile Friendly**: Responsive design with viewport meta tag
- **Structured Data**: Ready for schema.org markup

## 🎮 Game Modes

### vs AI (Insane)
- Play against an unbeatable AI opponent
- Minimax algorithm ensures optimal AI moves
- Perfect for testing your strategy

### Local Multiplayer
- Two players on the same device
- Alternating turns with clear UI indicators
- Ideal for competitive play

### Online Multiplayer (Coming Soon)
- Real-time multiplayer with Socket.io
- Authoritative game logic on backend
- Global matchmaking system

## 📊 User Statistics

Track your gaming progress:

- **Wins**: Total number of games won
- **Losses**: Total number of games lost
- **Draws**: Total number of draws
- **Level**: Calculated from XP (every 100 XP = 1 level)
- **XP**: Earned from playing (50 XP for win, 20 for draw, 10 for loss)
- **Rank**: Based on total wins (lower rank = better)

## 🌐 Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

```bash
# Build the project
pnpm build

# The dist/ folder is ready for deployment
```

### Manus Hosting

Deploy directly through the Manus platform with built-in custom domain support.

### Other Static Hosts

The project can be deployed to any static hosting provider (Vercel, Netlify, etc.):

1. Build the project: `pnpm build`
2. Deploy the `dist/` folder to your hosting provider

## 📝 Legal

- **Privacy Policy**: `/privacy` - Comprehensive data handling policy
- **Terms of Service**: `/terms` - Usage terms and conditions
- **Ad Placeholder**: Footer includes responsive ad container for Google AdSense

## 🔧 Configuration

### Environment Variables

The project uses Vite's built-in environment variables:

```env
VITE_APP_TITLE=GameSR
VITE_APP_LOGO=https://...
VITE_ANALYTICS_ENDPOINT=https://...
VITE_ANALYTICS_WEBSITE_ID=...
```

### Customization

To customize the platform:

1. **Colors**: Edit CSS variables in `client/src/index.css`
2. **Typography**: Update font imports in `client/index.html`
3. **AI Difficulty**: Modify scoring in `client/src/lib/minimax.ts`
4. **Game Rules**: Update logic in `client/src/lib/gameState.ts`

## 🐛 Troubleshooting

### Dev Server Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Build Errors
```bash
# Type check
pnpm check

# Format code
pnpm format
```

### LocalStorage Issues
- Clear browser cache and LocalStorage
- Check browser console for errors
- Ensure LocalStorage is not disabled

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Minimax Algorithm](https://en.wikipedia.org/wiki/Minimax)
- [Wouter Router](https://github.com/molefrog/wouter)

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙌 Credits

Built with precision by the GameSR Team. Designed for players who appreciate quality gaming experiences.

---

**GameSR** - Where strategy meets elegance. Play, compete, and dominate the global leaderboard.
