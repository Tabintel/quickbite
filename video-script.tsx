import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VideoScript() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Video Script: Mini Food Ordering App with Flutterwave</h1>
      <Separator className="my-4" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Introduction (30 seconds)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            "Hey developers! Today I'm going to show you how I built a mini food ordering app with Flutterwave payment
            integration in just 30 minutes. If you're building any kind of e-commerce or hospitality app in Africa,
            you'll want to see how simple this is."
          </p>
          <p className="text-gray-700 mt-2">
            "I'll walk you through the entire process - from setting up the project to processing our first payment.
            Let's dive in!"
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Setup (1 minute)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            "I'm starting with a fresh Next.js project. First, let's install the Flutterwave React package:"
          </p>
          <div className="bg-gray-100 p-3 rounded-md my-2 font-mono text-sm">
            npm install flutterwave-react-v3 sonner
          </div>
          <p className="text-gray-700 mt-2">
            "Next, I'll add my Flutterwave public key to my environment variables. You can get this from your
            Flutterwave dashboard after signing up."
          </p>
          <div className="bg-gray-100 p-3 rounded-md my-2 font-mono text-sm">
            NEXT_PUBLIC_FLW_PUBLIC_KEY=YOUR_FLUTTERWAVE_PUBLIC_KEY
          </div>
          <p className="text-gray-700 mt-2">"That's it for setup! Now let's build our food ordering interface."</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Building the UI (2 minutes)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            "For our food ordering app, we need a simple menu with food items and an 'Order Now' button. I've created a
            basic UI with food cards showing the name, description, price, and an order button."
          </p>
          <p className="text-gray-700 mt-2">[Show the UI code and explain the structure]</p>
          <p className="text-gray-700 mt-2">
            "I've added three menu items - Jollof Rice, Beef Burger, and Chicken Suya - each with its own card. The UI
            is responsive, so it works great on both mobile and desktop."
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Flutterwave Integration (3 minutes)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            "Now for the exciting part - integrating Flutterwave payments! This is surprisingly simple with their React
            package."
          </p>
          <p className="text-gray-700 mt-2">[Show the Flutterwave configuration code]</p>
          <p className="text-gray-700 mt-2">
            "Let me explain what's happening here:
            <br />
            1. We import the useFlutterwave hook and closePaymentModal function
            <br />
            2. We create a configuration object with our public key, transaction reference, amount, currency, and
            customer details
            <br />
            3. We use the useFlutterwave hook to initialize the payment
            <br />
            4. We handle the payment callback to show success or error messages"
          </p>
          <p className="text-gray-700 mt-2">
            "The beauty of Flutterwave is that it handles all the complex payment processing while giving us a simple
            API to work with."
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Demo Time (2 minutes)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            "Let's see our app in action! I'll click on the 'Order Now' button for the Jollof Rice."
          </p>
          <p className="text-gray-700 mt-2">
            [Show clicking the Order Now button and the Flutterwave payment modal appearing]
          </p>
          <p className="text-gray-700 mt-2">
            "As you can see, Flutterwave's payment modal opens up with all the details we configured. It shows multiple
            payment options including card, bank transfer, and USSD."
          </p>
          <p className="text-gray-700 mt-2">"Let me complete a test payment..."</p>
          <p className="text-gray-700 mt-2">[Complete a test payment using Flutterwave's test card]</p>
          <p className="text-gray-700 mt-2">
            "Great! The payment was successful, and we got a success notification. In a real app, we would now process
            the order in our backend."
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Features to Highlight (1 minute)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            "Let me highlight some key features of our integration:
            <br />
            1. Multiple payment methods - Flutterwave supports cards, bank transfers, USSD, and more
            <br />
            2. Customizable UI - We can customize the payment modal with our logo and colors
            <br />
            3. Secure - Flutterwave handles all the security concerns
            <br />
            4. Simple callbacks - We get notified when payments succeed or fail
            <br />
            5. Cross-border support - Works across multiple African countries and currencies"
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Conclusion (1 minute)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            "And that's it! In less than 30 minutes, we've built a functional food ordering app with Flutterwave payment
            integration. This same approach can be used for any type of e-commerce, hospitality, or service business
            that needs to collect payments."
          </p>
          <p className="text-gray-700 mt-2">
            "If you're building apps for the African market, Flutterwave makes payment processing incredibly simple.
            Their documentation is excellent, and they have SDKs for various platforms."
          </p>
          <p className="text-gray-700 mt-2">
            "Check out the links in the description for the full code and Flutterwave's documentation. Thanks for
            watching, and happy coding!"
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Tips for Recording</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Keep your screen clean and focused on the code/app</li>
            <li>Speak clearly and at a moderate pace</li>
            <li>Use Flutterwave's test cards for the demo (available in their documentation)</li>
            <li>Consider adding your face in a small corner of the screen for a more personal touch</li>
            <li>Highlight how quick and easy the integration process is throughout the video</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
