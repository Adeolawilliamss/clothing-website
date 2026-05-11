import { Metadata } from 'next';

export const metadata:Metadata = {
  title:'Contact Us'
}

export default function Contact() {
    return (
      <div className="bg-white dark:bg-black py-4 min-h-full">
        <div className="container flex flex-col justify-center items-center mx-auto px-4">
          <h1 className="font-extrabold text-black dark:text-white mt-32 text-2xl md:text-3xl">Contact Us!</h1>
          <p className="mt-5 font-light text-black dark:text-white">
            Got any issues? Want to send feedback about any product? Need details
            about our products and delivery? Let us know!
          </p>
          <form className="mt-5 gap-5 w-full max-w-xl">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                Your email:
              </label>
              <input
                type="email"
                id="email"
                className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                placeholder="name@Adeolaclothes.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 mt-10 text-md font-medium text-gray-900"
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                className="block shadow-lg p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Let us know how we can help you!"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-md mt-10 font-medium text-gray-900"
              >
                Your Message:
              </label>
              <textarea
                id="message"
                rows={6}
                className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg shadow-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-md mt-5 font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    );
  }