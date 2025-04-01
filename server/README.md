# Solar Facility API

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Apollo Server](https://img.shields.io/badge/Apollo%20Server-4.11.3-blueviolet.svg)](https://www.apollographql.com/docs/apollo-server/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/Authentication-JWT-yellow.svg)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A modern GraphQL API for managing solar facilities and their performance data, with user authentication and CSV upload capabilities.

## Features

- **GraphQL API**: Query and mutate solar facility data
- **User Authentication**: JWT-based authentication with signup and signin
- **CRUD Operations**: Complete facility management (Create, Read, Update, Delete)
- **CSV Upload**: REST endpoint for uploading performance data
- **TypeScript**: Fully typed codebase with GraphQL code generation
- **MongoDB**: Persistent storage with Mongoose ODM

## Getting Started

### Prerequisites

- Node.js (v20.9.0)
- MongoDB database

### Installation

```bash
# Clone the repository
git clone https://github.com/saqibroy/solar-facility-dashboard.git
cd solar-facility-dashboard/server

# Install dependencies
npm install

# Create .env file (see example below)
cp .env.example .env

# Start the server
npm start
```

### Environment Variables

Create a `.env` file with the following:

```
MONGODB_URI=DB-URI
JWT_SECRET=your-secret-key
```

## API Documentation

### GraphQL Endpoint

The GraphQL API is available at:
```
http://localhost:4000/graphql
```

### Authentication

```graphql
# Sign up a new user
mutation SignUp($username: String!, $password: String!) {
  signUp(username: $username, password: $password) {
    token
    user {
      id
      username
    }
  }
}

# Sign in an existing user
mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    token
    user {
      id
      username
    }
  }
}

# Get current authenticated user
query Me {
  me {
    id
    username
  }
}
```

### Facility Management

```graphql
# Get all facilities
query GetFacilities {
  facilities {
    id
    name
    nominalPower
  }
}

# Create a new facility
mutation CreateFacility($name: String!, $nominalPower: Int!) {
  createFacility(name: $name, nominalPower: $nominalPower) {
    id
    name
    nominalPower
  }
}

# Update an existing facility
mutation UpdateFacility($id: ID!, $name: String, $nominalPower: Int) {
  updateFacility(id: $id, name: $name, nominalPower: $nominalPower) {
    id
    name
    nominalPower
  }
}

# Delete a facility and its data
mutation DeleteFacility($id: ID!) {
  deleteFacility(id: $id)
}
```

### Performance Data

```graphql
# Get performance data for a specific facility
query GetPerformanceData($facilityId: ID!) {
  performanceData(facilityId: $facilityId) {
    id
    timestamp
    activePower
    energy
    facilityId
  }
}
```

### CSV Upload Endpoint

Upload performance data CSV files to:
```
POST http://localhost:4000/upload-performance-data/:facilityId
```

CSV files should contain columns for:
- timestamp (ISO-8601 format)
- activePower (number)
- energy (number)

Example cURL command:
```bash
curl -X POST -F "file=@/path/to/data.csv" -H "Authorization: Bearer your-token" http://localhost:4000/upload-performance-data/your-facility-id
```

## Authentication Flow

The API uses JWT (JSON Web Token) for authentication:

1. User signs up or signs in, receiving a JWT token
2. Client includes the token in the Authorization header for subsequent requests:
   ```
   Authorization: Bearer your-token
   ```
3. Protected routes/resolvers verify the token and identify the user
4. Tokens expire after 1 day (configurable in the code)

## Development

```bash
# Run in development mode with hot-reload
npm run dev

# Generate GraphQL types
npm run generate

# Type check
npm run type-check

# Lint and format code
npm run format
```

## Project Structure

```
src/
├── models/        # MongoDB schema definitions, including User model
├── utils/         # Utility functions, including CSV parser and auth helpers
├── index.ts       # Main application entry point
├── resolvers.ts   # GraphQL resolvers
├── schema.graphql # GraphQL schema
├── types.ts       # TypeScript interfaces and types
└── db.ts          # Database connection
```

## Authentication Implementation

The authentication system is implemented using the following files:

- `models/User.ts` - MongoDB schema for users
- `utils/auth.ts` - JWT token generation and verification
- Resolver methods for `signUp`, `signIn`, and `me` queries


## Technologies Used

- [Apollo Server](https://github.com/apollographql/apollo-server) - GraphQL server
- [Mongoose](https://mongoosejs.com/docs/typescript.html) - MongoDB ODM with TypeScript
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Express](https://expressjs.com/) - Web server
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) - Type generation
- [Multer](https://github.com/expressjs/multer) - File upload handling
- [CSV Parser](https://github.com/mafintosh/csv-parser) - CSV processing
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JWT implementation

## References

- [Apollo Server Documentation](https://github.com/apollographql/apollo-server)
- [Apollo TypeScript Tutorial](https://www.apollographql.com/tutorials/intro-typescript)
- [Mongoose TypeScript Documentation](https://mongoosejs.com/docs/typescript.html)
- [File Upload with Apollo Server](https://www.apollographql.com/blog/backend/file-uploads/file-upload-best-practices/)
- [CSV Processing in Node.js](https://csv.js.org/parse/)