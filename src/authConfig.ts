import type { Configuration } from '@azure/msal-browser'

// TODO: Replace the placeholder IDs and redirectUri with your real values
// from the Microsoft Entra (Azure AD) app registration.
export const msalConfig: Configuration = {
  auth: {
    clientId: 'd0885220-0f9c-4730-95af-65ed2f1f057e',
    authority: 'https://login.microsoftonline.com/86c31438-fa49-420e-842a-2614f7a025d8',
    redirectUri: 'http://localhost:5173',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
}

// Scopes you want for ID/access tokens. Adjust as needed for your APIs.
export const loginRequest = {
  scopes: ['User.Read'],
}

