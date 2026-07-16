# The Raww Factor 🦖

A prehistoric e-commerce website where customers can browse, filter, and purchase ethically cloned dinosaurs. Built by a team of 5 as the final exam project for *Frameworks and Architecture for the Web* at IT University of Copenhagen.

## Project Evolution

The project was built in three stages over the semester:

1. **Multi-page HTML application** — 8 pages built with HTML, CSS3, Bootstrap, and vanilla JavaScript
2. **RESTful API introduced** — HTTP communication added using Node.js and Express
3. **Final submission** — full migration of the frontend to a React + TypeScript single-page application, connected to the RESTful API backend

## Tech Stack

**Frontend:** React · TypeScript · React Router · Context API · Vite · Bootstrap 5.3 + Bootstrap Icons
**Backend:** Node.js · Express · RESTful API · JSON file storage
**Design:** Custom CSS variable system (dark forest theme), Cascadia Mono / Nunito typography
**Tools:** Figma (wireframes), Git/GitHub (feature-branch workflow)

## Features

- Browse all products, filterable by diet, era, size, environment, and license requirement
- Full product detail pages with traits, ownership requirements, and related products
- Add, view, and remove items from the shopping cart, with quantity editing
- Home page with featured products, testimonials, and newsletter sign-up
- Shop as a guest (cart persisted in `localStorage`) or register for a personalized experience
- Registration with first name, family name, and email — validated before account creation
- Logged-in users see their name in the navbar; guest cart is automatically transferred to the server-side cart on login
- Fully responsive single-page application (desktop, tablet, mobile)
- Beyond the original scope: About page, Contact page with auto-fill for logged-in users, sticky nav with active-page highlighting

## API Design

RESTful API with 8 endpoints across two resources — products and baskets:

| # | Resource path | Method | Description |
|---|---|---|---|
| 1 | `/products` | GET | Get key info for all products |
| 2 | `/products/{id}` | GET | Get full details for a specific product |
| 3 | `/categories` | GET | Get all available product categories |
| 4 | `/products?category=value` | GET | Filter products by category |
| 5 | `/users/{userId}/basket` | POST / GET | Create / get a user's basket |
| 6 | `/users/{userId}/basket/items` | PUT | Add a product to the basket |
| 7 | `/users/{userId}/basket/items/{productId}` | DELETE | Remove a product from the basket |

## Architecture

- **Backend:** layered structure — routing, controller, and model layers, organized by resource (products, baskets). `server.js` handles only app setup (middleware, CORS, router mounting).
- **Frontend:** SPA structured into pages, reusable components, API layer (`api/index.ts`), TypeScript types, and Context API state (auth, cart).
- **Data flow:** guest carts persist in `localStorage`; logged-in carts are stored server-side in `baskets.json`, keyed by user ID, and merged automatically on login.

## My Contributions

- Owned the shopping cart feature end-to-end across all three project phases — from the original multi-page JavaScript implementation through to the final React + TypeScript submission
- Defined the REST API routes for basket functionality (create, read, update, delete operations)
- Set up the React application structure and developed the Context API state management (cart and auth)

## Team

Built by a team of 5 as a course project at IT University of Copenhagen.

## Getting Started

The frontend and backend run as two separate processes — you'll need two terminal windows.

**1. Clone the repo**
```bash
git clone https://github.com/meomia/The_Raww_Factor.git
cd The_Raww_Factor
```

**2. Start the backend** (from the project root)
```bash
node server/server.js
```
This runs the Express API on `http://localhost:3000`.

**3. Start the frontend** (in a new terminal)
```bash
cd dinoshop-react
npm install
npm run dev
```
This starts the React + Vite dev server (typically `http://localhost:5173`).

> Both need to be running for the app to work — the React frontend calls the API on port 3000.
