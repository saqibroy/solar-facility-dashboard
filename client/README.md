# Solar Facility Dashboard - Client

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-5.17.1-purple.svg)](https://mui.com/)
[![Apollo Client](https://img.shields.io/badge/Apollo%20Client-3.13.5-blueviolet.svg)](https://www.apollographql.com/docs/react/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)

The frontend application for the Solar Facility Dashboard, built with React, TypeScript, and Material UI.

## Features

- **User Authentication**: Sign up, login, and logout functionality
- **Facility Management**: Create, view, update, and delete solar facilities
- **Data Visualization**: Interactive charts using Recharts to visualize facility performance
- **CSV Upload**: Upload performance data for specific facilities
- **Form Validation**: Client-side validation with React Hook Form
- **State Management**: Lightweight state management with Zustand
- **Tab-based Navigation**: Single-page application with tabs for facility and performance data views

## Getting Started

### Prerequisites

- Node.js (v20.9.0)
- Backend server running (see main project README)

### Installation

```bash

git clone https://github.com/saqibroy/solar-facility-dashboard.git

# Navigate to client directory
cd solar-facility-dashboard/client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Environment Variables

Create a `.env` file with the following:

```
VITE_API_URL=http://localhost:4000/graphql
```

### Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── graphql/          # GraphQL queries and mutations
├── store/            # Zustand state management
├── types.ts          # TypeScript interfaces and types
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
└── utils.ts          # util functions
└── apollo-client.ts  # Application entry point
```

## Key Components

### Authentication

- Login form
- Registration form
- Auth state management

### Navigation

- Tab-based navigation with Material UI Tabs
- Main tabs for Facilities and Performance Data
- User must select a facility before viewing its performance data

### Facility Management

- Facility list/grid view
- Create facility form
- Edit facility form
- Delete facility confirmation

### Data Visualization

- Time-series charts for active power
- Energy production visualization
- CSV upload and processing
- Performance metrics display

## Apollo GraphQL

The application uses Apollo Client to communicate with the GraphQL API. Example queries:

```typescript
// Get all facilities
const GET_FACILITIES = gql`
  query GetFacilities {
    facilities {
      id
      name
      nominalPower
    }
  }
`;

// Get performance data for a specific facility
const GET_PERFORMANCE_DATA = gql`
  query GetPerformanceData($facilityId: ID!) {
    performanceData(facilityId: $facilityId) {
      id
      timestamp
      activePower
      energy
    }
  }
`;
```

## Form Handling

Forms are implemented using React Hook Form with Material UI components:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm<FacilityFormData>();

const onSubmit = (data: FacilityFormData) => {
  createFacility({ variables: { name: data.name, nominalPower: parseFloat(data.nominalPower) } });
};
```

## Recharts

Performance data visualization is implemented using Recharts:

```typescript
<LineChart width={800} height={400} data={performanceData}>
  <XAxis dataKey="timestamp" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="activePower" stroke="#8884d8" />
</LineChart>
```

## Development

```bash
# Lint code
npm run lint

# Format code with Prettier and ESLint
npm run format
```

## References

- [Material UI Components](https://mui.com/material-ui/getting-started/overview/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
- [Recharts API](https://recharts.org/en-US/api)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)