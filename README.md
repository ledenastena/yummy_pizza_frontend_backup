This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### This is a backup version of Yummy Pizza front-end

Had to resort to using create-react-app at the last moment.
I was coding with manual webpack configuration the whole time but ran into problems when trying
to deploy to Heroku and was running out of time.

I am not happy with this result but some solution is better than none.
The functionality is all there but my goal was to manage the configuration myself instead of relying on create react app.

Since this is a quick fix, this repository doesn't have significant commit history, if you want to see the repository that I was working on up to this point following Git Flow branching see: 

https://github.com/ledenastena/yummy_pizza_frontend

### The App

App workflow is straightforward, when a page that displays products is visited, the data is fetched through an API:

https://yummypizza-api.herokuapp.com/api/

This is where our data resides and is available online. 

When we want all of the products displayed we simply fetch:

https://yummypizza-api.herokuapp.com/api/products

When we want specific type of products we need to pass the id parameter to the API. To make a more realistic and dynamic workflow we get this parameter from the backend where it lives in a separate table of product type ids. 

So when a user requests certan type of products in the front-end we fetch the corresponding product type id from the backend and then fetch products with the required value of id. This requires two API calls with the second one dependent of the result from the first one. To implement this kind of logic Redux Thunk is used.

The user can add products to cart and checkout with contact details. The cart contnent is persisted so the user doesn't lose the products if the page is refreshed.

The checkout confirmation leads the user back to the homepage.