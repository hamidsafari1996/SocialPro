## SocialPro
A modern, scalable, and dynamic website built with Next.js, TypeScript, and WordPress for seamless content management.

## Project Status
🚧 **Under Development**: This project is actively being developed, and new features are being added regularly. Contributions and feedback are welcome!
## Built With
- [Next.js](https://nextjs.org/) - React Framework for Production
- [TypeScript](https://www.typescriptlang.org/) - Strongly Typed JavaScript
- [WordPress](https://wordpress.org/) - Content Management System
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework (if used)

## Getting Started
To run this project locally, follow these steps:
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- WordPress instance with API enabled

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hamidsafari1996/SocialPro.git
   cd SocialPro
    ```
## Setting Up WordPress
To use WordPress as the CMS for this project, follow these steps:
#### Step 1: Download WordPress
Download the latest version of WordPress from the official website:
[WordPress.org](https://wordpress.org/download/)
#### Step 2: Set Up a Local Server
To run WordPress locally, you can use one of the following tools:

- [XAMPP](https://www.apachefriends.org/index.html): A free and open-source cross-platform web server solution.
- [WAMP](https://www.wampserver.com/): A Windows-based server with Apache, MySQL, and PHP.
- [Local by Flywheel](https://localwp.com/): A user-friendly tool for creating local WordPress environments.

After installing any of these tools, follow their instructions to create a new local server environment.
#### Step 3: Install WordPress
1. Extract the downloaded WordPress files into the `htdocs` folder (XAMPP) or the root directory of your chosen server.
2. Open your browser and navigate to `http://localhost/your-folder-name`.
3. Follow the on-screen instructions to set up WordPress.
4. Create a new database in your local server (e.g., using phpMyAdmin).
5. During setup, enter the database name, username, password, and host (`localhost` for local servers).

### Step 5: Configure API in the Project
Update the environment variables in the `story.tsx`, `box-shop.tsx`, file to connect your Next.js application with your WordPress installation.

Example `components/Main/story.tsx`,
Example `components/Main/box-shop.tsx`


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contact
Hamid Safari - [LinkedIn](https://linkedin.com/in/hamidsafari)