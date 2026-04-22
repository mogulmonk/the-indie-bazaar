# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test suite exists in this project.

## Architecture

This is a **single-page React app** (Vite + Tailwind) with zero backend — all brand data is hardcoded. The entire app lives in one file: `src/App.jsx`.

### Key structure inside `App.jsx`

- **`STARTUPS` array** (top of file) — the full product catalog. Each entry has `id`, `name`, `category`, `tags[]`, `description`, `price`, `color` (Tailwind bg class), and `url`.
- **`fuseOptions`** — Fuse.js config for fuzzy search, weighted: `name` (0.5) > `tags` (0.3) > `description` (0.2) > `category` (0.1), threshold 0.3.
- **`BrandCard` component** — renders individual brand cards.
- **`StoryView` / `GiftGuideView`** — full-page views rendered inline in `App`.
- **`App` component** — root component with all state and layout.

### State (3 hooks only)

```js
const [currentView, setCurrentView] = useState('home'); // 'home' | 'story' | 'guide'
const [activeCategory, setActiveCategory] = useState('All');
const [searchQuery, setSearchQuery] = useState('');
```

### Routing

No React Router. Views switch via `currentView` state — URL does not change on navigation.

### Filter pipeline

`filteredBrands` (useMemo): fuzzy search via Fuse.js → category filter → result array for the grid.

## Design system

- **Tailwind v3** with no custom theme extensions — all styling uses stock utility classes.
- Global background: `#FFF8F0` (warm cream), set in `index.html` / root styles.
- Retro aesthetic: 2px black borders, custom drop shadows (`shadow-[4px_4px_0px_...]`), `-translate-y-1` hover lifts.
- Icons from `lucide-react`.

## Adding a new brand

Add an object to the `STARTUPS` array in `src/App.jsx`. Categories must be one of: `'Pantry'`, `'Wardrobe'`, `'Living'`, `'Play'`, `'Self'`. Tags drive search quality — include 15–25 relevant keywords. Choose a Tailwind pastel bg color for the `color` field.
