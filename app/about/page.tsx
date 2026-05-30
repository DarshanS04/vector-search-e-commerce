// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600 text-lg">
          Your trusted destination for quality products and exceptional shopping experiences.
        </p>
      </div>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to ShopEase, your one-stop online marketplace for discovering
            quality products at competitive prices. Founded with a passion for
            convenience and customer satisfaction, we strive to make online
            shopping simple, secure, and enjoyable for everyone.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to connect customers with products they love while
            delivering outstanding service every step of the way. We carefully
            curate our catalog to ensure quality, value, and reliability.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Wide range of quality products</li>
            <li>Secure and easy checkout process</li>
            <li>Fast and reliable shipping</li>
            <li>Friendly customer support team</li>
            <li>Competitive pricing and regular offers</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a future where shopping online is effortless, transparent,
            and accessible to everyone. By continuously improving our platform and
            listening to customer feedback, we aim to become a trusted shopping
            destination worldwide.
          </p>
        </div>
      </section>
    </main>
  );
}