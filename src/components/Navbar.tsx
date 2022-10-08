import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 w-full bg-slate-100">
      <div className="flex items-center justify-between lg:justify-end border-gray-100 py-1 lg:py-6">
        <Link href={"/post"}>
          <button className="btn btn-sm lg:btn-md btn-accent font-bold mx-2 lg:mx-6 ">
            <div className="text-xs md:text-base">Post Job - Free</div>
            {/* <Image src={ArrowRight} alt="arrow" height="25px" width="25px" /> */}
          </button>
        </Link>
        <div>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
