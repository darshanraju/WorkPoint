import Typing from "react-typing-animation";
import Typed from "react-typed";

export default function Header() {
  return (
    <section className="dark:text-white w-full bg-white dark:bg-gray-900 bg-slate-100">
      <div className="px-4 py-6 xlg:py-20 mx-auto lg:items-center lg:flex">
        <div className=" mx-auto text-center w-full">
          <h1 className="text-5xl md:text-[5rem] font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 py-3">
            CSE Gigs
          </h1>
          <h1 className="text-4xl md:text-[4rem] font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-full py-3">
            Find your first job in tech
          </h1>
          {/* <p className="dark:text-[#bfbfbf] hidden lg:flex max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl md:text-[1.5rem]">
            Discover Internship and Graduate Early Career Jobs in Tech! —
            Connect with companies hiring in a few clicks and take your first
            steps into the industry.
          </p> */}
          <p className="dark:text-[#bfbfbf] hidden lg:flex max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl md:text-[1.5rem]">
            <Typed
              strings={[
                "Become a Software Engineer",
                "Become a Data Scientist",
                "Become a Data Engineer",
                "Become a Backend Engineer",
                "Become a Frontend Engineer",
                "Become a Fullstack Engineer",
                "Become a Devops Engineer",
                "Become a Software Consultant",
                "Become a UX Designer",
              ]}
              typeSpeed={50}
              backSpeed={20}
              backDelay={3000}
              loop
              className="text-4xl font-bold"
            />
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        {/* <Typing speed={500}>
          Find your first job as a:
          <span>Software Engineer</span>
          <Typing.Backspace count={17} />
          <span>Data Scientist</span>
          <Typing.Backspace count={14} />
        </Typing> */}
      </div>
    </section>
  );
}
