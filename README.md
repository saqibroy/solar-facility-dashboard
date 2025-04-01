# Solar Facility Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-5.17.1-purple.svg)](https://mui.com/)
[![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-3.13.5-blueviolet.svg)](https://www.apollographql.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)](https://mongoosejs.com/)

A full-stack application for managing solar facilities, uploading performance data via CSV files, and visualizing facility performance through interactive charts.


## Features

### Core Features
- **User Authentication**: Sign up, login, and logout functionality
- **Facility Management**: Create, read, update, and delete solar facilities
- **Data Upload**: Upload CSV files containing performance data for specific facilities
- **Data Visualization**: Interactive charts to visualize facility performance over time
- **Error Handling**: Comprehensive error management throughout the application

### Technical Features
- **Full TypeScript Support**: End-to-end type safety
- **GraphQL API**: Efficient data fetching and mutations
- **Responsive UI**: Mobile-friendly interface using Material UI
- **Form Validation**: Client-side validation with React Hook Form
- **State Management**: Zustand for lightweight and efficient state management

## Project Structure

```
solar-facility-dashboard/
├── client/             # React frontend application
├── server/             # Node.js GraphQL API backend
├── package.json        # Root package.json for running both client and server
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v20.9.0)
- MongoDB database

### Installation

```bash
# Clone the repository
git clone https://github.com/saqibroy/solar-facility-dashboard.git
cd solar-facility-dashboard

# Install all dependencies (client, server, and root)
npm run install-all

# Create .env files
# In server directory, create a .env file with MONGODB_URI and JWT_SECRET (see server/README.md for details)
# In client directory, create a .env file with your GraphQL endpoint in VITE_GRAPHQL_URL (see client/README.md for details)

# Start both client and server
npm run dev
```

## Usage

### User Authentication

1. Register a new account with email and password
2. Login with your credentials
3. Logout when finished

### Facility Management

1. Navigate to the Facilities tab
2. Add a new facility with name and nominal power
3. View all facilities in a list
4. Edit existing facility details
5. Delete facilities when no longer needed

### Performance Data Management

1. Select a facility from the facilities tab and click "View Performance Data"
2. Alternatively, switch to the Performance Data tab to select a facility
3. Upload a CSV file containing timestamps, active power (kW), and energy (kWh)
4. View the parsed data in interactive charts
5. Analyze facility performance over time

### CSV Format

CSV files should contain the following columns:
- `timestamp` (ISO-8601 format)
- `active_power_kw` (number in kW)
- `energy_kwh` (number in kWh)

Example:
```
timestamp,active_power_kw,energy_kwh
2023-01-01T08:00:00Z,120.5,350.2
2023-01-01T09:00:00Z,150.3,400.1
...
```

## Development

```bash
# Start the server only
npm run start-server

# Start the client only
npm run start-client

# Start both client and server in development mode
npm run dev
```

## Technology Stack

### Frontend (Client)
- **React**: UI library
- **TypeScript**: Type safety
- **Material UI**: Component library and styling
- **Apollo Client**: GraphQL client
- **React Hook Form**: Form handling
- **Recharts**: Data visualization
- **Zustand**: State management
- **Vite**: Build tool

### Backend (Server)
- **Node.js**: JavaScript runtime
- **TypeScript**: Type safety
- **Apollo Server**: GraphQL server
- **Express**: Web server framework
- **Mongoose**: MongoDB ODM
- **GraphQL**: API query language
- **Multer**: File upload handling
- **CSV Parser**: CSV processing
- **JWT**: Authentication

## API Documentation

For detailed documentation on the available GraphQL queries and mutations, please refer to the [server README](./server/README.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## References

### Official Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [GraphQL Documentation](https://graphql.org/learn/)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
- [Recharts Documentation](https://recharts.org/en-US/api)
- [JSON Web Token Documentation](https://github.com/auth0/node-jsonwebtoken#readme)

### Tutorials and Guides
- [GraphQL with TypeScript Tutorial](https://www.apollographql.com/docs/apollo-server/getting-started)
- [Material UI System Overview](https://mui.com/system/getting-started/overview/)