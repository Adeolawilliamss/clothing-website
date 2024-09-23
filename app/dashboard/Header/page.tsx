import DarkMode from '@/app/ui/DarkMode/DarkMode';
import { oswald } from '@/app/ui/fonts'
export default function Header () {
    return(
        <div>
        <div className="relative bg-[url(/Clothing-website.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-x-0 top-32 flex justify-center z-20">
                <DarkMode />
            </div>
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/90 sm:to-white/25"></div>
        <div className="relative mx-auto max-w-screen px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 lg:pb-24">
          <div className="max-w-xl text-center sm:text-left ">
            <h1 className={`${oswald.className} text-4xl font-extrabold text-black dark:text-red-500 sm:text-5xl md:text-6xl`}>
              NEW SEASONS ARRIVAL
            </h1>

            <p className="mt-4 max-w-lg text-lg sm:text-xl lg:text-3xl sm:leading-relaxed">
              CHECK OUT LATEST TRENDS
            </p>
          </div>
        </div>
      </div>
        </div>
    )
}