// app/contact/page.tsx

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          We'd love to hear from you. Get in touch with our team for any
          questions, feedback, or support.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-medium">Address</h3>
              <p>123 Commerce Street, Bangalore, Karnataka 560001</p>
            </div>

            <div>
              <h3 className="font-medium">Email</h3>
              <p>support@shopease.com</p>
            </div>

            <div>
              <h3 className="font-medium">Phone</h3>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <h3 className="font-medium">Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-black px-6 py-3 text-white transition hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}