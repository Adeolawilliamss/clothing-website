import { Metadata } from 'next';

export const metadata:Metadata = {
  title:'About'
}
export default function About() {
    return (
      <div className="bg-white dark:bg-black py-10 min-h-full">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-black dark:text-white text-2xl mt-32 md:text-3xl">About Us</h1>
            <p className="text-black dark:text-white mt-4 mx-auto max-w-xl md:max-w-3xl text-sm md:text-base">
              We are more than multiple services.
              Food is one of the basic necessities of life. 
              We are more than multiple services which serve the best foods and drinks.
              We provide the best and healthiest foods with great taste.
            </p>
          </div>
  
          <div className="mt-12 md:mt-16">
            <h1 className="text-black dark:text-white text-center text-xl md:text-2xl">Our Story</h1>
            <div className="relative bg-[url('/About-Front.jpeg')] bg-cover bg-center bg-no-repeat h-48 md:h-64 mt-4">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black dark:bg-white p-4 md:p-6 rounded-lg shadow-lg w-11/12 lg:w-4/5">
                <p className="text-white dark:text-black text-center text-xs md:text-base">
                  Justo. Nunc. Montes ligula est nunc molestie feugiat rutrum risus ultricies eros, penatibus elit senectus montes.
                  Sagittis enim quam. Penatibus posuere faucibus praesent cras laoreet nascetur sem neque. Faucibus. Sollicitudin interdum eros, per tempor 
                  donec donec, primis arcu penatibus nascetur.
                </p>
              </div>
            </div>
          </div>
  
          <div className="mt-32 md:mt-16">
            <h1 className="text-black dark:text-white text-center text-xl md:text-2xl">Our Mission</h1>
            <div className="relative bg-[url('/About-Middle.jpeg')] bg-cover bg-center bg-no-repeat h-48 md:h-64 mt-4">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black dark:bg-white p-4 md:p-6 rounded-lg shadow-lg w-11/12 lg:w-4/5">
                <p className="text-white dark:text-black text-center text-xs md:text-base">
                  Justo. Nunc. Montes ligula est nunc molestie feugiat rutrum risus ultricies eros, penatibus elit senectus montes.
                  Sagittis enim quam. Penatibus posuere faucibus praesent cras laoreet nascetur sem neque. Faucibus. Sollicitudin interdum eros, per tempor 
                  donec donec, primis arcu penatibus nascetur.
                </p>
              </div>
            </div>
          </div>
  
          <hr className="mt-32 md:mt-16 border-black dark:border-white" />
  
          <div className="mt-20 md:mt-16">
            <h1 className="text-black dark:text-white text-xl md:text-2xl">Why Choose Us?</h1>
            <div className="flex flex-col lg:flex-row items-center mt-4">
              <img 
                src="/About-End.jpeg" 
                className="rounded-lg w-full lg:w-1/2 object-contain h-48 md:h-64 lg:h-auto" 
                alt="Why Choose Us" 
              />
              <div className="lg:ml-8 mt-8 lg:mt-0">
                <p className="text-black dark:text-white text-xs md:text-base">
                  Justo. Nunc. Montes ligula est nunc molestie feugiat rutrum risus ultricies eros, penatibus elit senectus montes.
                  Sagittis enim quam. Penatibus posuere faucibus praesent cras laoreet nascetur sem neque. Faucibus. Sollicitudin interdum eros, per tempor 
                  donec donec, primis arcu penatibus nascetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  