# Six Cities

## Project Overview

**Six Cities** — SPA-приложение на React 18 (проект HTML Academy, версия 14.0.0). Пользователи просматривают предложения по аренде в разных городах, фильтруют их, оставляют отзывы и сохраняют избранные предложения.

## Tech Stack

| Category    | Tool                                                                        |
| ----------- | -----------------------------------------------------------------           |
| Framework   | React 18.2.0 + react-dom 18.2.0                                             |
| Build       | Vite 4.4.11 (`@vitejs/plugin-react` 4.1.0)                                  |
| Language    | TypeScript 5.2.2                                                            |
| Routing     | react-router-dom 6.16.0 (+ `history` 5.3.0)                                 |
| State       | @reduxjs/toolkit 1.9.7 + react-redux 8.1.3                                  |
| HTTP        | axios 1.5.1 (+ `http-status-codes` 2.3.0)                                   |
| Maps        | leaflet 1.7.1 (+ `@types/leaflet` 1.9.3)                                    |
| Styling     | classnames 2.3.2, react-helmet-async 1.3.0                                  |
| Testing     | vitest 0.34.6, @testing-library/react 14.0.0, jsdom 22.1.0                  |
| Mocking     | faker 5.5.3, axios-mock-adapter 1.22.0, @jedmao/redux-mock-store            |
| Linting     | eslint 8.51.0 + eslint-config-htmlacademy 9.1.1, react-hooks, react-refresh |

## Project Structure

```
src/
  index.tsx                    # Entry: StrictMode + Provider + App (передаёт mockOffers/mockOfferDetails)
  const.ts                     # AppRoute enum, AuthorizationStatus enum, CITIES
  setupTests.ts                # Vitest globals + jest-dom matchers
  store/
    index.ts                   # configureStore, типы RootState / AppDispatch
    action.ts                  # createAction: changeCity, fillOffers
    reducer.ts                 # InitialState, createReducer (builder)
  hooks/
    use-map.ts                 # Инициализация/обновление Leaflet-карты
  types/
    place-card.ts              # Rating, Location, City, PlaceCard, PlaceCardType
    offer.ts                   # User, Review, OfferDetail
  utils/
    date.ts                    # formatDate
    rating.ts                  # getRatingPercentage, getNumericRating
  mocks/
    offers.ts                  # mockOffers, mockOfferDetails (статические данные)
  components/
    app/                       # BrowserRouter + Routes + dispatch(fillOffers)
    cities-list/               # Табы городов (clsx + Link на AppRoute.Main)
    header/                    # Логотип, навигация, счётчик избранного
    footer/                    # Футер
    place-card/                # Карточка предложения в списке
    places-list/               # Рендер списка карточек + hover-события
    near-places-list/          # Список «неподалёку» (без интерактива)
    offer-card/                # Составная карточка предложения (плоские файлы)
      index.ts                 # Barrel: PremiumBadge, RatingBar, BookmarkButton,
                               #   PriceBlock, PlaceInfo, OfferCardBody + тип OfferCardBodyProps
      offer-card-body.tsx      # Собирает подкомпоненты
      premium-badge.tsx        # Условный бейдж «Premium»
      rating-bar.tsx           # Звёздный рейтинг через CSS width
      price-block.tsx          # Цена + BookmarkButton
      place-info.tsx           # Название + тип
      bookmark-button.tsx      # Переключатель избранного
    favorite-card/             # Карточка избранного (без интерактива)
    favorites-places-list/     # Избранное, сгруппированное по городам
    reviews-list/              # index.ts (barrel) + review-list.tsx + review-item.tsx
    review-form/               # Рейтинг + текстовое поле (50–300 символов)
    private-route/             # Route guard по authorizationStatus
    map/                       # Leaflet-карта
      index.ts
      map.tsx                  # Marker-слой, активный маркер
      map-config.ts            # URL_MARKER_DEFAULT / URL_MARKER_CURRENT
  pages/
    main/                      # Города + сортировка + PlacesList + Map
    login/                     # Форма входа
    favorites/                 # Избранные предложения по городам
    favorites-empty/           # Пустое состояние избранного
    offer/                     # Детальная страница предложения
    offer-not-logged/          # Предложение для неавторизованных
    main-empty/                # Пустое состояние главной
    not-found/                 # 404
public/img/                    # Изображения, иконки, маркеры карты (pin.svg, pin-active.svg)
markup/                        # Статические HTML-макеты (референс)
.agents/skills/                # Локальные навыки агента: react-patterns,
                               #   typescript-javascript-patterns, frontend-patterns
```

## Routing

| Route        | Component | Auth     |
| ------------ | --------- | -------- |
| `/`          | Main      | Public   |
| `/login`     | Login     | Public   |
| `/favorites` | Favorites | Required |
| `/offer/:id` | Offer     | Public   |
| `*`          | NotFound  | Public   |

`AppRoute.Offer` равен `/offer` (без `:id`) — динамический маршрут собирается как
`` `${AppRoute.Offer}/:id` `` в [app.tsx](src/components/app/app.tsx).

Все пути **обязаны** использовать `enum AppRoute` из `src/const.ts` — не хардкодить строки.
`PrivateRoute` принимает `authorizationStatus` и `redirectTo` (по умолчанию `AppRoute.Login`);
в `App` статус пока захардкожен как `AuthorizationStatus.NoAuth`, поэтому `/favorites` редиректит на `/login`.

## Key Types

```typescript
// src/types/place-card.ts
type Rating = 0 | 20 | 40 | 60 | 80 | 100;
type Location = Readonly<{ latitude: number; longitude: number; zoom: number }>;
type City = { name: string; location: Location };

enum PlaceCardType {
  Apartment = 'Apartment',
  Room = 'Room',
}

type PlaceCard = {
  id: string; img: string; cost: number; title: string;
  type: PlaceCardType; rating: Rating;
  isPremium: boolean; isBookmarked: boolean; city: City;
};

// src/types/offer.ts
type User = { name: string; avatarUrl: string; isPro: boolean };
type Review = { id: string; date: string; user: User; comment: string; rating: 1 | 2 | 3 | 4 | 5 };
type OfferDetail = PlaceCard & {
  description: string; images: string[]; goods: string[];
  host: User; bedrooms: number; maxAdults: number; reviews: Review[];
};
```

## Conventions

### TypeScript
- Strict mode, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `forceConsistentCasingInFileNames`
- `target: ES2020`, `module: ESNext`, `moduleResolution: bundler`, `allowImportingTsExtensions`
- JSX: `react-jsx` (automatic runtime)
- `skipLibCheck`, `isolatedModules`, `noEmit`, `resolveJsonModule`
- `types`: `vitest/globals`, `@testing-library/jest-dom`
- Типы импортируются через `import type`

### Code Style
- ESLint: `eslint-config-htmlacademy/react-typescript`
- Файлы — kebab-case, компоненты — PascalCase
- Импорты: сначала внешние пакеты, пустая строка, затем внутренние (относительные пути)
- Селф-клоуз теги: всегда `<Component />`, никогда `<Component></Component>`
- Колбэки-обработчики в компонентах: `handleXxx`; пропсы-колбэки: `onXxx`

### State Management
- Глобальное состояние — Redux Toolkit (`createReducer` + `createAction`, без слайсов)
- Форма стора ([reducer.ts](src/store/reducer.ts)):

```typescript
type InitialState = {
  city: City;          // начальное значение — CITIES[0]
  offers: PlaceCard[]; // начальное значение — []
};
```

- Экшены ([action.ts](src/store/action.ts)): `changeCity(city)`, `fillOffers(offers)`
- `App` при монтировании вызывает `dispatch(fillOffers(offers))`; `Main` читает `state.city` и `state.offers` через `useSelector` и вызывает `dispatch(changeCity(city))`
- Типы `RootState` / `AppDispatch` экспортируются из `src/store/index.ts`
- Локальное состояние (активный id, поля форм) — `useState` / `useCallback`
- `AuthorizationStatus`: `Auth` | `NoAuth` | `Unknown`

### Testing
- Vitest с jsdom, глобалы включены; конфиг в `vite.config.ts`
- Setup-файл: `src/setupTests.ts` — расширяет jest-dom matchers
- Тестовых файлов пока нет — скрипт запускается с `--passWithNoTests`
- Для моков: faker (данные), axios-mock-adapter (HTTP), @jedmao/redux-mock-store (стор)

### Component Patterns
- Только функциональные компоненты с хуками (без классов)
- Пропсы описываются типом `<ComponentName>Props`
- Barrel-экспорты через `index.ts` (см. `offer-card`, `reviews-list`, `map`)
- Составной паттерн: родитель собирает подкомпоненты (`OfferCardBody` → `PremiumBadge`, `RatingBar`, `PriceBlock`, `PlaceInfo`)
- Карта: логика вынесена в хук `useMap`, маркеры — в `map.tsx`

## Commands

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm start`       | Dev-сервер (Vite)                  |
| `npm run build`   | Проверка типов (`tsc`) + сборка    |
| `npm run lint`    | ESLint по `src/` (.ts, .tsx)       |
| `npm run preview` | Просмотр production-сборки         |
| `npm run test`    | Vitest (`--passWithNoTests`)       |

Всегда после изменений: `npm run lint && npm run test`.

## Git Workflow

- Не коммитить напрямую в `master`
- Удалённые репозитории: `origin` — `fedor81/six-cities`, `upstream` — `htmlacademy-univer-javascript-3/2722617-six-cities-7`
- Перед новой задачей — pull из репозитория Академии (`upstream`; в `Contributing.md` он называется `academy`)
- Работа ведётся в feature-ветках (текущая: `module6-task1`)
- Полные правила — в `Contributing.md`
