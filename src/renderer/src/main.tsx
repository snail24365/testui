import { Provider } from 'react-redux'
import store from './store'
import './assets/main.css'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
)
