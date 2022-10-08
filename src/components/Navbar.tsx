import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 w-full bg-slate-100">
      <div className="flex justify-end border-gray-100 py-6">
        <Link href={"/post"} className="py-6">
          <button className="btn btn-accent gap-2 font-bold mx-6">
            Post A Job
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
