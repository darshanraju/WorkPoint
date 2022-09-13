import React, { FormEvent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

const EmailSubscription = () => {
  const subscription = trpc.useMutation("subscribe");
  const [subbed, setSubbed] = useState(false);
  const [email, setEmail] = useState<string>("");
  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    subscription.mutate(email);
  };

  useEffect(() => {
    if (subscription.isSuccess) setSubbed(true);
  }, [subscription.isSuccess]);

  if (subbed) return <></>;
  return (
    <div className="fixed bottom-0 w-full bg-stone-50  border-t-indigo-500">
      <div className="text-gray-700 m-1 text-base lg:hidden font-medium text-center">
        Get new intern and grad jobs sent to
      </div>
      <div className="flex justify-center ">
        <div className="text-gray-700 lg:text-xl m-2  items-center hidden lg:flex">
          Get new intern and grad jobs sent to
        </div>
        <form className="flex" onSubmit={subscribe}>
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered input-primary w-full max-w-xs m-2 text-center"
            value={email}
            onChange={(value) => setEmail(value.target.value)}
          />
          <button
            disabled={subscription.isLoading}
            className="btn btn-success m-2"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailSubscription;
