import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
      ripple: true,
      inputStyle: 'outlined',
    }),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const authLink = new ApolloLink((operation, forward) => {
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('jwt_token') : null;
        if (token) {
          operation.setContext(({ headers = {} }: { headers: Record<string, string> }) => ({
            headers: { ...headers, Authorization: `Bearer ${token}` },
          }));
        }
        return forward(operation);
      });

      return {
        link: authLink.concat(httpLink.create({ uri: environment.graphqlUrl })),
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: { fetchPolicy: 'cache-and-network' },
        },
      };
    }),
  ],
};
