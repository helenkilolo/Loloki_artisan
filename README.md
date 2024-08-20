# Loloki Africa Artisan eCommerce Platform

Welcome to the **Loloki Africa Artisan** eCommerce Platform! This platform is designed to empower local artisans by providing them with an online marketplace to showcase and sell their handcrafted products. The platform offers a seamless shopping experience, complete with user authentication, payment integration, and a customizable storefront for each artisan.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## About

**Loloki Africa Artisan** is an eCommerce platform aimed at promoting local craftsmanship by providing a dedicated space where artisans can create and manage their online stores. The platform supports multiple product categories, secure payment methods (including MPesa and Stripe), and is designed to be user-friendly and fully customizable.

This project is built using [Next.js](https://nextjs.org/) for the frontend and backend rendering, with a focus on performance, scalability, and security. The platform is mobile-responsive, ensuring an optimal shopping experience across all devices.

## Features

- **Artisan Storefronts:** Each artisan can create and customize their own store page.
- **Product Management:** Artisans can easily add, edit, and manage their products, including inventory management.
- **Secure Payments:** Integrated with MPesa and Stripe for secure and flexible payment options.
- **User Authentication:** Includes registration, login, social media login, and password recovery features.
- **Shopping Cart:** Persistent cart with options to adjust quantities, remove items, and proceed to checkout.
- **Order History:** Users can view their past orders and order details.
- **Multilingual Support:** The platform supports multiple languages, catering to a diverse audience.
- **Responsive Design:** Optimized for both desktop and mobile users.

## Project Structure


src/
├── app/
│   ├── components/
│   │   ├── CartItem.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   └── ...
├── pages/
│   ├── orders.js
│   ├── cart.js
│   ├── checkout.js
│   └── ...
├── context/
│   ├── CartContext.js
│   └── ...
├── utils/
│   ├── auth.js
│   └── ...
└── ...


## Installation

To set up the project locally, follow these steps:

### Clone the repository:

git clone https://github.com/helenkilolo/Loloki_artisan
cd Loloki_artisan

Install dependencies:
npm install
Set up environment variables:
Create a .env.local file in the root of your project and add your environment-specific variables:

## Usage

Sign up as an artisan or customer.
Browse products across various categories.
Add items to your cart and proceed to checkout.
Manage your store (for artisans) by adding new products and monitoring sales.
View order history and manage your account settings.
