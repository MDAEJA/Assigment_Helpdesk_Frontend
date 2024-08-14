# Helpdesk Application

This project is a simple Helpdesk app created using React. It includes multiple pages for handling tickets, customers, profiles, and admin functionalities. The app uses React Router for navigation and a global context to manage state across the application.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Context](#context)
- [Routes](#routes)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/helpdesk-app.git
    cd helpdesk-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

The application should now be running on `http://localhost:3000`.

## Usage

The application consists of the following pages:
- **HomePage**: The landing page of the application.
- **TicketsPage**: Displays a list of tickets.
- **CustomersPage**: Displays a list of customers.
- **ProfilePage**: Shows the profile information of the logged-in user.
- **AdminPage**: Restricted to users with an admin role. Displays administrative controls.
- **TicketStatus**: Shows the status of a particular ticket.

Navigate between these pages using the sidebar.

## Project Structure

src/
├── components/
│ ├── AdminPage.js
│ ├── CustomersPage.js
│ ├── HomePage.js
│ ├── ProfilePage.js
│ ├── Sidebar.js
│ ├── TicketStatus.js
│ └── TicketsPage.js
├── App.css
├── App.js
└── index.js

## Components

### `App.js`

The root component of the application. It sets up the context and the routes for the application.

### `Sidebar.js`

The sidebar component provides navigation links to different pages of the application.

### `HomePage.js`

The landing page of the application.

### `TicketsPage.js`

Displays a list of tickets.

### `CustomersPage.js`

Displays a list of customers.

### `ProfilePage.js`

Shows the profile information of the logged-in user.

### `AdminPage.js`

Restricted to users with an admin role. Displays administrative controls.

### `TicketStatus.js`

Shows the status of a particular ticket.

## Context

### `userContext`

The `userContext` provides global state management for the user information, customer data, index, and update details.

```javascript
export const userContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState({
    "id": "",
    "name": "",
    "email": "",
    "role": "",
    "status": "Pending",
    "priority": ""
  });

  const [customerData, setCustomerData] = useState([]);
  const [index, setIndex] = useState(0);
  const [updateDetails, setUpdateDetails] = useState({});

  return (
    <userContext.Provider value={{ userInfo, setUserInfo, customerData, setCustomerData, index, setIndex, updateDetails, setUpdateDetails }}>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path='/customers' element={<CustomersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path='/ticketstatus' element={<TicketStatus />} />
          </Routes>
        </div>
      </div>
    </userContext.Provider>
  );
}

export default App;

### Routes
The application uses react-router-dom to handle navigation. The following routes are defined:

/: Renders the HomePage component.
/tickets: Renders the TicketsPage component.
/customers: Renders the CustomersPage component.
/profile: Renders the ProfilePage component.
/admin: Renders the AdminPage component.
/ticketstatus: Renders the TicketStatus component.

### License


Save this content in a file named `README.md` in your project directory.
