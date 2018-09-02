# FoodRecycler

A NodeJS web app with a user authentication system which allows charities to claim food waste, and food sources to post or sell their leftover food. The home page lists the foods available, the sellFoods section allows people to post new foods, and the myFoods section shows the status of the user's foods (sold or still available, purchaser contact details etc). People can claim/buy food by adding the item to their cart, and checking out afterwards.

## Setting up MongoDB:

Method 1: Set-up MongoDB locally and create a database named `auth`, and two
collections named `users` and `posts`.

Method 2: Alter `/models/post.js` and `/models/user.js` to connect to the database of your choice.

## How to run:
1. Install all the dependencies

`npm install`

2. Run the app

`npm start`

