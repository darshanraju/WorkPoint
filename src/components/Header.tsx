/* This example requires Tailwind CSS v2.0+ */
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: BoltIcon,
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ChatBubbleBottomCenterTextIcon,
  },
];
// max-w-screen-xl
export default function Header() {
  return (
    <section className="dark:text-white dark:bg-gray-900 w-full bg-white">
      <div className="px-4 py-6 xlg:py-20 mx-auto lg:items-center lg:flex">
        <div className=" mx-auto text-center w-full">
          <h1 className="text-5xl md:text-[5rem] font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 py-3">
            CSE Gigs
          </h1>
          <h1 className="text-4xl md:text-[4rem] font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-full py-3">
            Find your first job in tech
          </h1>
          <p className="hidden lg:flex max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl md:text-[1.5rem]">
            Discover Internship and Graduate Early Career Jobs in Tech! —
            Connect with companies hiring in a few clicks and take your first
            steps into the industry.
          </p>
        </div>
      </div>
    </section>
  );
}
