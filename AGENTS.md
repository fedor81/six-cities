# Six Cities

## Project Overview

**Six Cities** — SPA-приложение на React 18 (проект HTML Academy). Пользователи просматривают предложения по аренде в разных городах, фильтруют их, оставляют отзывы и сохраняют избранные предложения.

## Tech Stack

| Category  | Tool                                                |
| --------- | --------------------------------------------------- |
| Framework | React 18.2.0                                        |
| Build     | Vite 4.4.11                                         |
| Language  | TypeScript 5.2.2                                    |
| Routing   | react-router-dom 6.16.0                             |
| State     | @reduxjs/toolkit 1.9.7 + react-redux 8.1.3          |
| HTTP      | axios 1.5.1                                         |
| Maps      | leaflet 1.7.1                                       |
| Styling   | classnames 2.3.2, react-helmet-async                |
| Testing   | vitest 0.34.6, @testing-library/react 14.0.0, jsdom |
| Linting   | eslint 8.51.0 + eslint-config-htmlacademy           |
| Mocking   | faker 5.5.3, axios-mock-adapter 1.22.0              |

## Project Structure

```
src/
  index.tsx                  # Entry point
  const.ts                   # AppRoute enum, AuthorizationStatus enum
  setupTests.ts              # Vitest globals + jest-dom matchers
  types/                     # Shared TypeScript types
  utils/                     # Pure utility functions
  mocks/                     # Static mock data
  components/                # Reusable UI components
    app/                     # Root: BrowserRouter + Routes
    header/                  # Header with logo, navigation, auth
    footer/                  # Footer
    place-card/              # List item card
    places-list/             # Offers list renderer
    favorite-card/           # Favorite item (non-interactive)
    favorites-places-list/   # Grouped favorites by city
    review-form/             # Star rating + textarea form
    private-route/           # Route guard for authenticated pages
    offer-card/              # Composite offer detail component
      offer-card-body.tsx    # Assembles sub-components
      bookmark-button/       # Bookmark toggle
      place-info/            # Title + type
      premium-badge/         # Conditional "Premium" badge
      price-block/           # Price + BookmarkButton
      rating-bar/            # CSS width-based star bar
  pages/                     # Page-level components
    main/                    # City tabs + sorting + PlacesList
    login/                   # Email/password login
    favorites/               # Bookmarked offers grouped by city
    favorites-empty/         # Empty state
    offer/                   # Full offer detail
    offer-not-logged/        # Offer detail for guests
    main-empty/              # Empty state
    not-found/               # 404 page
markup/                      # Static HTML templates (reference)
```

## Routing

| Route        | Component | Auth     |
| ------------ | --------- | -------- |
| `/`          | Main      | Public   |
| `/login`     | Login     | Public   |
| `/favorites` | Favorites | Required |
| `/offer/:id` | Offer     | Public   |
| `*`          | NotFound  | Public   |

All route paths **must** use `enum AppRoute` from `src/const.ts` — never hardcode strings.
Auth-required pages wrapped in `<PrivateRoute>`.

## Key Types

```typescript
// src/types/place-card.ts
type Rating = 0 | 20 | 40 | 60 | 80 | 100;
type PlaceCardType = 'Apartment' | 'Room';
interface PlaceCard { id, img, cost, title, type, rating, isPremium, isBookmarked, city }

// src/types/offer.ts
interface User { name, avatarUrl, isPro }
interface Review { id, date, user, comment, rating: 1 | 2 | 3 | 4 | 5 }
interface OfferDetail extends PlaceCard { description, images, goods, host, bedrooms, maxAdults, reviews }
```

## Conventions

### TypeScript
- Strict mode, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- `target: ES2020`, `module: ESNext`, `moduleResolution: bundler`
- JSX: `react-jsx` (automatic runtime)
- `skipLibCheck`, `isolatedModules`, `noEmit`

### Code Style
- ESLint: `eslint-config-htmlacademy/react-typescript`
- File naming: kebab-case for files, PascalCase for components
- Imports: grouped and sorted (ESLint rules)
- Self-closing JSX tags: always `<Component />`, never `<Component></Component>`

### State Management
- Redux Toolkit + react-redux are dependencies — use them for global state when needed
- Local state via `useState` hooks
- AuthorizationStatus enum: `Auth` | `NoAuth` | `Unknown`

### Testing
- Vitest with jsdom, globals enabled
- Setup: `src/setupTests.ts` — extends jest-dom matchers
- Mocking: faker for data, axios-mock-adapter for HTTP

### Component Patterns
- Functional components with hooks only (no class components)
- Props interfaces: `<ComponentName>Props`
- Barrel exports via `index.ts` where applicable
- Composite component pattern: parent assembles sub-components (e.g., `OfferCardBody` → `PremiumBadge`, `RatingBar`, `PriceBlock`)

## Commands

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm start`       | Dev server (Vite)             |
| `npm run build`   | Type check + production build |
| `npm run lint`    | ESLint on `src/` (.ts, .tsx)  |
| `npm run preview` | Preview production build      |
| `npm run test`    | Run Vitest                    |

Always run after changes: `npm run lint && npm run test`

## Git Workflow

- Do **not** commit directly to `master`
- Pull from `academy` remote before starting each new task
- Create feature branches for work
- See `Contributing.md` for full details
