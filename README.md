# Metropolitan Museum of Art API

A React Single Page Application (SPA) that leverages the **[Metropolitan Museum of Art Collection API](https://collectionapi.metmuseum.org/public/collection/v1/)** to showcase paginated art collections and detailed object views. This project demonstrates how to integrate public APIs into a modern React application using Vite, React Router, and Axios.

## Live Website

Visit the deployed version here: [**https://metropolitan-museum-of-art.netlify.app/**](https://metropolitan-museum-of-art.netlify.app/)

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
   - [Routes](#routes)  
   - [Pagination](#pagination)  
   - [Data Display](#data-display)  
3. [Search](#search-optional)  
4. [Technologies Used](#technologies-used)  
5. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running the App](#running-the-app)  
6. [Deployment](#deployment)    
8. [Contributing](#contributing)  
9. [License](#license)  

---

## Overview

This application pulls data from the Metropolitan Museum of Art's public collection API, allowing users to:

- Browse a large collection of art objects with pagination.  
- View comprehensive details for individual objects (images, artist info, dates, medium, etc.).  
- (Optionally) perform searches for artworks by keyword and view paginated search results.

The landing page (`/`) provides a brief overview and a link to explore the collection. Subsequent routes handle the listing and detailed pages of individual art objects.

---

## Features

### Routes

1. **Home** (`/`)
   - Welcomes users and provides a brief introduction to the application.
   - Offers a link to the Collection Listing page (`/collection/page/1`).

2. **Collection Listing** (`/collection/page/:page`)
   - Retrieves a list of object IDs from the Metropolitan Museum of Art API.
   - Displays each object's primary details (title, artist’s name, date, and optional image).
   - Includes pagination controls to move between pages.

3. **Object Details** (`/collection/:id`)
   - Shows detailed information for a single art object, including:
     - Title
     - Artist’s display name, biography, gender (if available)
     - Object date
     - Department
     - Medium
     - Classification
     - Culture
     - Dimensions
     - Other relevant fields if available
   - Displays `"N/A"` if a field is missing.

### Pagination

- Displays **50** art objects per page.  
- Shows only a **Next** button if you’re on page 1.  
- Shows both **Previous** and **Next** buttons on subsequent pages unless you’re at the last page.  
- Shows only a **Previous** button on the last page.  
- Redirects or displays an error (e.g., 404/400) if an invalid page number is requested.

### Data Display

- Fetches fields from the API responses carefully; missing values are handled gracefully.  
- If a valid open-access image is available, it is displayed alongside the artwork’s details.  

---

## Search 

An optional search feature can be implemented using the API’s `/search` endpoint:  
- Searches the museum’s collection by keyword.  
- Returns matching object IDs, which are then individually fetched to display partial or full details.  
- Paginated to handle large search result sets (commonly 20 items per page).

---

## Technologies Used

- **React (v18+)** – Core UI library for building a robust SPA  
- **Vite** – Fast development server and build tool  
- **React Router (v6)** – Client-side routing and parameterized routes  
- **Axios** – Simplified HTTP requests to external APIs  
- **Material-UI** – Streamlined UI components for styling  
- **Netlify** – Used for deployment  

---

## Getting Started

### Prerequisites

- Node.js (14.x or higher recommended)  
- npm (6.x or higher) or yarn  

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/KrutarthBhavani/Metropolitan-Museum-of-Art.git
   ```

2. **Navigate into the project folder**:

   ```bash
   cd Metropolitan-Museum-of-Art
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```
   *or*
   ```bash
   yarn
   ```

### Running the App

4. **Start the development server**:

   ```bash
   npm run dev
   ```
   *or*
   ```bash
   yarn dev
   ```

5. **Visit** [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to explore the site.


---

## Contributing

Contributions are welcome! Feel free to:

1. Fork this repository.  
2. Create a feature branch: `git checkout -b feature/amazing-feature`.  
3. Commit and push your changes: `git commit -m "Add amazing feature" && git push origin feature/amazing-feature`.  
4. Open a Pull Request describing your changes.

---

## License

This project is available under the [MIT License](./LICENSE). You’re free to modify and adapt it as long as you provide attribution to the original source.

---

Enjoy exploring the Metropolitan Museum of Art’s vast collection through this React SPA! If you have ideas or run into issues, please open an issue on the repository or submit a pull request. Have fun creating and learning!
