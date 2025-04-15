import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Side: Contact Info */}
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-gray-900">Send us Message</h2>

          <div className="flex items-start space-x-4">
            <div className="bg-lime-100 p-3 rounded-full">
              <Phone className="text-black" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Phone</p>
              <p className="text-gray-700">555-1234-678</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-lime-100 p-3 rounded-full">
              <Mail className="text-black" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Email</p>
              <p className="text-gray-700">mail@example.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-lime-100 p-3 rounded-full">
              <MapPin className="text-black" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Address</p>
              <p className="text-gray-700">
                2972 Westheimer Rd. Santa Ana, Illinois 85486
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <form
          action="https://formsubmit.co/masterymind16@gmail.com"
          method="POST"
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              required
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              type="text"
              required
              name="phone"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              name="message"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          <button
            type="submit"
            className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-2 rounded-full transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
