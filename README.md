# ComposeSDK React Card

This repository contains the `ComposeSDK React Card` project, which demonstrates the usage of the Sisense SDK within a React application.

![CustomCard](https://github.com/user-attachments/assets/34b04d40-ebd1-4831-b097-4d820fa4c1d5)



## Getting Started

To get started with this project, follow the steps below:

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/sisensers/ComposeSDK-React-Card.git
```

### 2. Add the `.env` File

You will need to add a `.env` file to the root directory of the project. This file will contain the Sisense URL and token required to run the application.

Create a `.env` file in the root directory and add the following lines:

```env
REACT_APP_SISENSE_URL=your-sisense-url
REACT_APP_SISENSE_TOKEN=your-sisense-token
```

Replace `your-sisense-url` and `your-sisense-token` with the appropriate values.

### 3. Obtain a Sisense Instance and Token

To utilize this project, you will need access to a Sisense instance.

- **Trial Users**: If you do not have a Sisense instance, you can register for a free trial [here](https://www.sisense.com/platform/compose-sdk-free-trial/). After registering, you'll receive a Sisense URL and API token.

- **Existing Customers**: If you are a Sisense customer, you can use your existing Sisense URL and API token. You can obtain your API token by:

  1. Accessing your profile information by clicking on the profile icon in the top right of the Fusion platform.
  2. Alternatively, you can generate a token using the following command in your local terminal:

     ```bash
     npx @sisense/sdk-cli@latest get-api-token --url <your_instance_url> --username <username>
     ```

### 4. Save the `.env` File

After adding the Sisense URL and token to the `.env` file, make sure to save it.

### 5. Install Dependencies

Navigate to the project directory and install the necessary dependencies by running:

```bash
npm install
```

### 6. Run the Application

Once the dependencies are installed, start the development server with:

```bash
npm start
```

This will run the application locally, and you can view it in your browser at `http://localhost:3000`.

## Project Structure

The primary components of the application are located in the `components` folder. This is where you'll find the main building blocks of the application.
