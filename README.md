
# Frontend Project

This is the frontend application developed using React.js. The project is containerized using Docker as part of the full application stack with the backend.

## Running the Frontend Only

To run the frontend application independently, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sumanpitla/frontend.git
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the project:**
   ```bash
   npm start
    ```
3. The application should now be accessible at `http://localhost:3000`.

## Running as Part of the Full Application Stack

If you want to run the full application including both the frontend and backend, please visit the [backend repository](https://github.com/sumanpitla/backend).

The backend repository contains the necessary Docker Compose setup to run both the frontend and backend together. The frontend Docker image is already integrated into the backend's Docker Compose file, so you only need to run the following command from the backend project directory:

```bash
docker-compose up
```

This will pull the frontend and backend images from Docker Hub, set up the containers, and run the entire application stack.

## Suggestions

- **Visit the Backend Repo:** For a complete experience with the frontend and backend, it's recommended to visit the [backend repository](https://github.com/sumanpitla/backend). The backend repo includes instructions on running the entire application stack with Docker Compose.
- **Environment Variables:** If your frontend relies on specific environment variables, ensure they are set correctly when running the Docker container.

---

For any issues or questions, feel free to open an issue in the repository.
