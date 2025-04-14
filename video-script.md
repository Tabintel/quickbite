# Demo Video Script: Building a Food Ordering App with Flutterwave

## Introduction (30 seconds)
"Hey developers! Today I'm going to show you how I built a complete food ordering app with Flutterwave payment integration in just 30 minutes. If you're building any kind of e-commerce or hospitality app in Africa, you'll want to see how simple this is.

I'll walk you through the entire process - from user authentication to processing payments and viewing order history. Let's dive in!"

## App Overview (1 minute)
"Our app has several key features:
1. User authentication with sign-up and login
2. A food menu with different items
3. Flutterwave payment integration
4. Order confirmation and history
5. User dashboard

The app is built with Next.js and uses Flutterwave's React SDK for payment processing. Let's take a look at how it all works."

## Authentication Flow (2 minutes)
"First, let's look at the authentication flow. We've created a simple sign-up and login system.

[Show the sign-up and login pages]

For this demo, we're storing user data in localStorage, but in a production app, you'd connect this to a backend database. The important thing is that we're capturing the user information we need for the Flutterwave payment process later."

## Menu and Food Selection (2 minutes)
"Next, let's look at our menu page. We have three delicious items: Jollof Rice, Beef Burger, and Chicken Suya.

[Show the menu page with the food items]

Each card displays the food image, name, description, and price. When a user clicks 'Order Now', we'll initiate the Flutterwave payment process.

Let's look at how we've implemented the food menu and the payment integration."

## Flutterwave Integration (3 minutes)
"Now for the exciting part - integrating Flutterwave payments! This is surprisingly simple with their React package.

[Show the code for the Flutterwave integration]

Let me explain what's happening here:
1. We import the useFlutterwave hook and closePaymentModal function
2. We create a configuration object with our public key, transaction reference, amount, currency, and customer details
3. We use the useFlutterwave hook to initialize the payment
4. We handle the payment callback to show success or error messages

The beauty of Flutterwave is that it handles all the complex payment processing while giving us a simple API to work with."

## Payment Flow Demo (3 minutes)
"Let's see our app in action! I'll log in and order some Jollof Rice.

[Show logging in and clicking the Order Now button for Jollof Rice]

As you can see, Flutterwave's payment modal opens up with all the details we configured. It shows multiple payment options including card, bank transfer, and USSD.

Let me complete a test payment using Flutterwave's test card:
- Card Number: 5531 8866 5214 2950
- CVV: 564
- Expiry: 09/32
- PIN: 3310
- OTP: 12345

[Complete the test payment]

Great! The payment was successful, and we're redirected to our success page with order details. Notice the 'Order More Food' button that takes us back to the menu, and the 'View Order History' button that takes us to the dashboard."

## Order History and Dashboard (2 minutes)
"After completing a payment, the order is saved and can be viewed in the user's dashboard.

[Navigate to the dashboard]

Here we can see all our past orders, including the Jollof Rice we just ordered. The dashboard also has a profile tab where users can view and edit their account information.

In a real app, you would fetch this data from your backend, but for our demo, we're storing it in localStorage."

## Key Features to Highlight (1 minute)
"Let me highlight some key features of our integration:
1. Multiple payment methods - Flutterwave supports cards, bank transfers, USSD, and more
2. Customizable UI - We can customize the payment modal with our logo and colors
3. Secure - Flutterwave handles all the security concerns
4. Simple callbacks - We get notified when payments succeed or fail
5. Cross-border support - Works across multiple African countries and currencies"

## Conclusion (1 minute)
"And that's it! We've built a complete food ordering app with Flutterwave payment integration. This same approach can be used for any type of e-commerce, hospitality, or service business that needs to collect payments.

If you're building apps for the African market, Flutterwave makes payment processing incredibly simple. Their documentation is excellent, and they have SDKs for various platforms.

Check out the links in the description for the full code and Flutterwave's documentation. Thanks for watching, and happy coding!"
