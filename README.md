**Securitech Backend and Frontend Setup**
**Prerequisites**
Node.js installed (v14 or higher)
npm (comes with Node.js)
nmap installed and configured in your system environment
Getting the Source Code
Clone the Securitech project for both the frontend and backend using the following GitHub repository links:

**bash**
Copy code
git clone https://github.com/vinaysandesh/securitech_backend.git
git clone https://github.com/vinaysandesh/securitech.git 
Make sure to replace <your-backend-repo-url> and <your-frontend-repo-url> with the actual URLs of the repositories.

**Installing Dependencies**
Once you have cloned both the frontend and backend repositories, navigate to their respective directories and install dependencies.

**For the Backend:**
bash
Copy code
cd <backend-repo-folder>
npm install
For the Frontend:
bash
Copy code
cd <frontend-repo-folder>
npm install
Installing Nmap
Nmap is required as a dependency for the backend to perform network scanning. Follow these steps to install Nmap:

**Windows:**

Download Nmap from the official website: https://nmap.org/download.html
Run the installer.
During installation, ensure that "Add Nmap directory to system PATH" is checked.
**Linux/macOS:**

bash
Copy code
sudo apt-get install nmap  # For Debian/Ubuntu
brew install nmap          # For macOS using Homebrew
Verify Nmap Installation: After installation, verify that Nmap is correctly installed and available by running:

bash
Copy code
nmap -v
Set Nmap in System Path: Ensure that the Nmap path is set in your system’s environment variables (if not automatically set). This will allow the backend to execute Nmap commands.

**For Windows:**

Right-click on "This PC" > "Properties" > "Advanced system settings".
Click on "Environment Variables", find the "Path" variable, and add the directory where Nmap is installed (e.g., C:\Program Files (x86)\Nmap).
For Linux/macOS: Nmap should automatically be available in your PATH after installation.

**Running the Applications**
**Backend:**
Navigate to the backend project directory:
bash
Copy code
cd https://github.com/vinaysandesh/securitech_backend.git
Run the backend using:
bash
Copy code
npm start
The backend will run on port 3001.
Frontend:
Navigate to the frontend project directory:
bash
Copy code
cd https://github.com/vinaysandesh/securitech.git
Run the frontend using:
bash
Copy code
npm start
The frontend will run on port 3000.
Accessing the Application
Once both the backend and frontend are running:

Open your browser and go to http://localhost:3000 to access the Securitech frontend.
The backend will be available at http://localhost:3001 and handle API requests.

**Troubleshooting**
Ensure that both frontend and backend run without errors. Check terminal output for errors if the applications do not start as expected.
Verify that Nmap is correctly installed and accessible via the command line.
