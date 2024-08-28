# ProductHub

ProductHub is an E-commerce Product Listing Platform built with the latest version of [Next.js](https://nextjs.org/), TypeScript, and Tailwind CSS. The platform allows users to list products, view individual product details, filter products by category or price, and perform CRUD (Create, Read, Update, Delete) operations on the products. The project is optimized for SEO and provides a clean and performant user experience.

## Overview

ProductHub is designed to simulate a full-fledged E-commerce platform where users can manage product listings without the need for a backend database. Products are stored in `localStorage` to persist data across sessions, allowing users to create, edit, and delete products locally. The platform also includes features like skeleton loaders for better user experience during data loading and a responsive design for optimal display on all devices.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v18.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rahmlad-aramide/ProductHub.git
   cd producthub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

You can start editing the project by modifying the files in the `app` directory. The app will automatically reload when you save your changes.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
# or
yarn build
```

This will generate the necessary static files in the `.next` directory, ready for deployment.

## Design Decisions, Optimizations, and Trade-offs

- **Next.js API Routes**: Although there is no traditional backend or database, Next.js API routes are used to simulate API calls for CRUD operations. These routes interact with `localStorage` to manage product data, allowing the app to mimic a real-world backend environment. This approach makes it easy to transition to a full backend if needed in the future.

- **Local Storage for Data Persistence**: Given the scope of this project, `localStorage` was chosen as the data store to persist product information. This decision allows the platform to function without a backend, making it easier to set up and use locally.
  
- **Skeleton Loaders**: To enhance user experience during data fetching, skeleton loaders are implemented. This provides a visual placeholder while data is being loaded, creating a smoother experience.

- **Tailwind CSS for Styling**: Tailwind CSS was selected for its utility-first approach, allowing rapid UI development and ensuring consistent styling across components.

- **Responsive Design**: The application is fully responsive, ensuring that it works well across a variety of screen sizes, from mobile devices to desktops.

## SEO Implementation

SEO was handled with the following strategies:

- **Dynamic Meta Tags**: Each product page dynamically generates meta tags, including the product title and description, to ensure that the content is indexed correctly by search engines.

- **Sitemap and Robots.txt**: A sitemap and `robots.txt` file were generated to guide search engine crawlers in indexing the site effectively.

- **Optimized Image Loading**: Images are optimized and served with the appropriate `alt` attributes to improve accessibility and SEO.

## Notes

This project is a frontend-only application intended for test purpose. For a full-stack implementation, database integration would be required to work with the API route.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can also check out the [Next.js GitHub repository](https://github.com/vercel/next.js/) for further exploration and contributions.

## Deployed on Vercel

This project was deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

You can check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
