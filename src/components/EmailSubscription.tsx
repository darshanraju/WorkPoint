import React from "react";

const EmailSubscription = () => {
  return (
    <div className="fixed bottom-0 flex justify-center w-full bg-stone-50">
      <div className="">Get new inter and grad roles sent to</div>
      <input
        type="text"
        placeholder="Your email"
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <button className="btn btn-success">Subscribe</button>
    </div>
  );
};

export default EmailSubscription;
