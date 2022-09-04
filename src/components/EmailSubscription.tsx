import React from "react";

const EmailSubscription = () => {
  return (
    <div className="fixed bottom-0 flex justify-center w-full bg-stone-50 p-5 border-t-indigo-500">
      <div className="text-gray-700 text-xl m-2 flex items-center">
        Get new intern and grad jobs sent to
      </div>
      <input
        type="email"
        placeholder="Your email"
        className="input input-bordered input-primary w-full max-w-xs m-2"
      />
      <button className="btn btn-success m-2">Subscribe</button>
    </div>
  );
};

export default EmailSubscription;
