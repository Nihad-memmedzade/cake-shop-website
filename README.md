# Cake House Frontend

A modern and responsive cake shop frontend built with React, TypeScript, Vite, Redux Toolkit, SCSS Modules, and multilingual support.

Cake House is an e-commerce style bakery application where users can browse cakes, filter products, view product details, manage wishlist and cart items, complete checkout, and track orders through their account.

## Features

- Responsive home page with hero slider, categories, trendy products, spring collection, and limited edition products
- Shop page with search, filters, sorting, pagination, and responsive filter drawer
- Product detail page with image slider, size selection, quantity control, reviews, and related products
- Wishlist for guest and authenticated users
- Cart drawer and full cart page
- Checkout flow with billing validation and payment method selection
- Order confirmation and order history
- Account pages for profile details, wishlist, and orders
- Login, register, and lost password pages
- Contact page with store details and map
- Error page for invalid routes and failed states
- English, Azerbaijani, and Polish language support
- Localized routes such as `/en/products`, `/az/products`, and `/pl/products`

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | UI development |
| TypeScript | Type safety |
| Vite | Development and build tool |
| Redux Toolkit | Global state management |
| React Router DOM | Client-side routing |
| Axios | API requests |
| SCSS Modules | Component styling |
| react-i18next | Internationalization |
| Swiper | Sliders and carousels |
| Leaflet | Map integration |
| Lucide React | Icons |

## Project Structure

```text
src/
  api/        API modules
  assets/     shared components, fonts, and images
  helpers/    reusable helper functions
  i18n/       language config and translation files
  pages/      application pages and sections
  routes/     route configuration and middleware
  store/      Redux store and slices
  styles/     global SCSS utilities
  types/      shared TypeScript types