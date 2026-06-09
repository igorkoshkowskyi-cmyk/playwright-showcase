[![Playwright Tests](https://github.com/igorkoshkowskyi-cmyk/playwright-showcase/actions/workflows/playwright.yml/badge.svg)](https://github.com/igorkoshkowskyi-cmyk/playwright-showcase/actions/workflows/playwright.yml)
[Live Allure Report](https://igorkoshkowskyi-cmyk.github.io/playwright-showcase/)

# Playwright Showcase

E2E test automation showcase project demonstrating Playwright + TypeScript skills.

## Stack

- Playwright + TypeScript (strict mode)
- Page Object Model
- Composed fixtures (authenticated state shared via storageState)
- ESLint flat config (no-floating-promises, no-misused-promises)
- Prettier

## CI/CD

- Sharded parallel execution (4 runners via matrix)
- Containerized via official Playwright Docker image
- Allure reporter with history trends
- Auto-deployed report to GitHub Pages on main

## What's covered

- Authentication flow (storage state pattern)
- Inventory page (sorting, filtering, cart operations)
- ...

## Run locally

\`\`\`bash
npm ci
npx playwright install
npx playwright test
\`\`\`

## Project structure

- `tests/` — test specs
- `pages/` — Page Object Model classes
- `components/` — reusable UI components (SideMenu, etc.)
- `fixtures/` — composed Playwright fixtures
