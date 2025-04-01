import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useAuthStore } from './stores/auth'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL
})

const authLink = setContext((_, { headers }) => {
  // Get the token from your auth store
  const token = useAuthStore.getState().token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
