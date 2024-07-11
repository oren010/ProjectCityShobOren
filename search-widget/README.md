# Search Widget Project

## Plugins or Extensions Used

1. **PrimeNG**: Used for UI components to enhance the functionality and look of the search widget.
2. **Angular Material**: Provided pre-built UI components such as form fields, expansion panels, and icons for a consistent design.
3. **RxJS**: Utilized for handling asynchronous data streams, particularly useful for filtering and searching data.
4. **Web Animations API**: Enabled animation effects within the Angular components for a smooth user experience.

## Implementing Multilingual Support

To implement multilingual support for types and names, we need a robust solution both on the server-side and client-side to handle translations effectively.

### Server-Side

1. **Translation Files**: Store translation files (e.g., JSON or YAML) for each supported language. These files will contain key-value pairs where keys are the same across languages, and values are the translations.

    ```json
    // en.json
    {
      "ZONE": "Zone",
      "SENSOR": "Sensor",
      "CAMERA": "Camera",
      "STABLE": "Stable",
      "UNSTABLE": "Unstable",
      "DISCONNECTED": "Disconnected"
    }

    // fr.json
    {
      "ZONE": "Zone",
      "SENSOR": "Capteur",
      "CAMERA": "Caméra",
      "STABLE": "Stable",
      "UNSTABLE": "Instable",
      "DISCONNECTED": "Déconnecté"
    }
    ```

2. **API Endpoint for Translations**: Create an API endpoint that serves the translation files based on the requested language. For example, `/api/translations?lang=en` would return the `en.json` file.

3. **Data Response Modification**: Modify the data responses to include translated strings or keys that can be translated on the client side. This ensures that the client receives data that can be displayed in the user's preferred language.

### Client-Side

1. **Angular i18n**: Use Angular’s i18n module or ngx-translate for handling translations. This allows dynamic loading of translation files based on user preferences or browser settings.

    ```typescript
    import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
    import { TranslateHttpLoader } from '@ngx-translate/http-loader';
    import { HttpClient } from '@angular/common/http';

    export function HttpLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
    }

    @NgModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      ...
    })
    ```

2. **Loading Translations**: Fetch the appropriate translation file during the application initialization. This can be based on the user's language preference stored in a cookie or local storage, or based on the browser's language settings.

    ```typescript
    constructor(private translate: TranslateService) {
      const lang = localStorage.getItem('lang') || 'en';
      translate.setDefaultLang(lang);
      translate.use(lang);
    }
    ```

3. **Translating Data**: Use translation keys in the templates to display the data in the selected language.

    ```html
    <h1>{{ 'ZONE' | translate }}</h1>
    ```

## Handling Data from Server with Different Formats

When receiving data from a server in a different format (e.g., PascalCase), you can handle this by mapping the data to the desired format during the data processing stage. This can be achieved by creating a utility function that converts the keys of the incoming data to the required format.

### Example Approach

```typescript
function convertKeysToCamelCase(data: any): any {
  if (Array.isArray(data)) {
    return data.map(item => convertKeysToCamelCase(item));
  } else if (data !== null && data.constructor === Object) {
    return Object.keys(data).reduce((result, key) => {
      const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
      result[camelCaseKey] = convertKeysToCamelCase(data[key]);
      return result;
    }, {});
  }
  return data;
}
Flowchart of Widget Operation
User Enters the Page

Load initial data from the server.
Display the search widget with default data.
User Types in the Search Bar

Capture the input event.
Filter the data based on the input.
Update the displayed data dynamically.
User Interacts with Expansion Panels

Click on a panel header.
Toggle the panel (expand/collapse).
Show/hide the child elements accordingly.
User Scrolls Through the Data

Scroll through the list if it exceeds the container's height.
Custom scrollbar appears for better UX.
Data Update from Server

Fetch updated data periodically or on user action.
Apply filters and update the displayed data.
Mocking Data for Development
To mock the data for development before the server is ready, you can use tools such as:

JSON Server: A simple tool to create a fake REST API that serves JSON data.

Install JSON Server: npm install -g json-server
Create a db.json file with the mock data.
Run the server: json-server --watch db.json
Mock Service Worker (MSW): Intercepts network requests and serves mock responses.

Install MSW: npm install msw --save-dev
Set up request handlers to return mock data for specific API endpoints.
Example Mock Data (db.json)
json
Copier le code
{
  "zones": [
    { "id": 1, "name": "Zone 1", "cameras": [{ "id": 1, "name": "Camera 1", "connection": "stable" }, { "id": 2, "name": "Camera 2", "connection": "unstable" }] },
    { "id": 2, "name": "Zone 2", "cameras": [{ "id": 3, "name": "Camera 3", "connection": "disconnected" }] }
  ],
  "sites": [
    { "id": 1, "name": "Site 1" },
    { "id": 2, "name": "Site 2" }
  ],
  "placemarks": [
    { "id": 1, "name": "Placemark 1" },
    { "id": 2, "name": "Placemark 2" }
  ],
  "layers": [
    { "id": 1, "name": "Layer 1" },
    { "id": 2, "name": "Layer 2" }
  ]
}
Using Mock Data in Angular
Replace HTTP service calls with URLs pointing to the mock server.
Ensure the application can switch between mock and real data seamlessly by using environment variables or configuration settings.