<!-- ### System Components

1. #### Frontend: Vue.js

   ##### Contains 3 components:

   **Header: Search for Locations**

   A header that displays the functionality of this single-page application.

   

   **Auto-complete Input Text Box**

   This component is imported from Ant Design.

   It takes in keywords from users and sends a GraphQL query to the backend based on the keyword.
   It receives state names that match the keywords and highlights the matched words inside the options dynamically.

   I imported Ant Design to implement this feature because native Vue.js doesn't support this autocomplete input box. Ant Design allows developers to inject the choices (which came from the backend and rendered by the frontend) in the dropdown list, through the 'options' property. This also enables us to customize the style of the options.

   

   **Google Maps**

   This component is imported from vue3-google-map. It's an open-source package that provides a pre-packaged Google Maps component for Vue 3 instead of initialize the map directly from Google Maps' API. Saved a lot of works!

   

2. #### Backend: Node.js

   **Apollo Server**

   Provides a robust GraphQL API endpoint. 

   

   **Mongoose**

   Object Document Mapper (ODM), used for handling database operations, so backend could communicate with MongoDB as well as transform the database results into a format that the frontend can easily digest.

   

   **GraphQL**

   Defines the structure and behavior of the API. 

   **typeDefs**: declare the following things - 

   What kind of queries are available
   What kind of parameters they accept
   Which fields are returned

   In this repository, the backend has a `states` query. It - 
   Takes in an optional String: filter
   Returns an array of State objects 
   
   e.g.,
   ```js
         "states": [
            {
                "name": "Alabama",
                "lat": 32.8067,
                "lng": -86.7911
            },
            {
                "name": "Alaska",
                "lat": 61.3707,
                "lng": -152.4044
            }]
   ```

   When a `states` query is received, resolver would handle it.

   

3. #### Database: MongoDB

   The database stores data about US states and territories in the `us-options` database. The `states` collection contains the following fields for each state:
   - name: The state or territory name
   - lat: The latitude coordinate of the state's center
   - lng: The longitude coordinate of the state's center -->


### System Components

---

#### 1. Frontend: Vue.js

##### Contains 3 components:

**Header: Search for Locations**  
A header that displays the functionality of this single-page application.

**Auto-complete Input Text Box**  
This component is imported from Ant Design.  
It takes in keywords from users and sends a GraphQL query to the backend based on the keyword.  
It receives state names that match the keywords and highlights the matched words inside the options dynamically.  

I imported Ant Design to implement this feature because native Vue.js doesn't support this autocomplete input box.  
Ant Design allows developers to inject the choices (which came from the backend and rendered by the frontend) in the dropdown list, through the `options` property.  
This also enables us to customize the style of the options.

**Google Maps**  
This component is imported from `vue3-google-map`.  
It's an open-source package that provides a pre-packaged Google Maps component for Vue 3 instead of initializing the map directly from Google Maps' API.  
Saved a lot of works!

---

#### 2. Backend: Node.js

**Apollo Server**  
Provides a robust GraphQL API endpoint.

**Mongoose**  
Object Document Mapper (ODM), used for handling database operations,  
so backend could communicate with MongoDB as well as transform the database results into a format that the frontend can easily digest.

**GraphQL**  
Defines the structure and behavior of the API.

- **typeDefs**: declare the following things:
  - What kind of queries are available
  - What kind of parameters they accept
  - Which fields are returned

In this repository, the backend has a `states` query. It:

- Takes in an optional String: `filter`
- Returns an array of State objects

```js
"states": [
  {
    "name": "Alabama",
    "lat": 32.8067,
    "lng": -86.7911
  },
  {
    "name": "Alaska",
    "lat": 61.3707,
    "lng": -152.4044
  }
]
