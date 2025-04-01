import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers'
      ],
      config: {
        contextType: './context#MyContext',
        mappers: {
          Facility: './models/Facility#IFacility',
          PerformanceData: './models/PerformanceData#IPerformanceData',
          User: './models/User#IUser'
        },
        scalars: {
            ID: {
              input: 'string',
              output: 'string'
            },
            DateTime: {
              input: 'Date',
              output: 'string'
            }
          }
      }
    }
  }
};

export default config;