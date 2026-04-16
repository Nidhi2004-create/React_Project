# Tax Loss Harvesting Tool

A responsive React application that demonstrates tax loss harvesting logic with mock API data.

## Features

- Pre-harvesting and after-harvesting summary cards
- Holdings table with selectable rows and select all support
- Live updates to after-harvesting values based on selections
- Savings message shown when realized gains decrease
- Mobile responsive layout
- Loader and error state handling
- "View all" holdings support for longer tables

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS for styling

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local Vite URL shown in the terminal.

## Project Structure

- `src/App.tsx` - main application logic and selection handling
- `src/mockApi.ts` - mocked API responses for holdings and capital gains
- `src/components/StatCard.tsx` - reusable summary card component
- `src/components/HoldingsTable.tsx` - holdings table with selection controls
- `src/index.css` - responsive styling

## Assumptions

- Mock APIs return static data and use a small simulated delay
- Selected holdings add gains and losses into the after-harvesting card based on positive/negative gain values
- Amount to sell is populated from `totalHoldings` only for selected rows

## Notes

- The deployment link
-  https://react-project-2vtc.vercel.app/ 
