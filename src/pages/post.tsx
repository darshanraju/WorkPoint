import Head from "next/head";
import React from "react";
import AddJobForm from "../components/AddJobForm";
import DarkModeToggle from "../components/DarkModeToggle";
import Navbar from "../components/Navbar";

const AddJob = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Head>
        <title>CSE Gigs</title>
        <meta name="description" content="Compsci/Seng Student Gigs" />
        <meta
          property="og:image"
          content="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Femoji-of-smiley-color%2F100%2Fsmiley_nerd-512.png&f=1&nofb=1"
        />

        <link rel="icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
      </Head>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen py-4 lg:px-4 dark:bg-gray-900 min-w-screen">
        <DarkModeToggle />
        <div className="flex flex-col items-center">
          <Head>
            <title>CSE Gigs</title>
            <meta name="description" content="Compsci/Seng Student Gigs" />
            <meta
              property="og:image"
              content="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Femoji-of-smiley-color%2F100%2Fsmiley_nerd-512.png&f=1&nofb=1"
            />

            <link rel="icon" href="/favicon.png" />
            <link
              rel="stylesheet"
              href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
            />
          </Head>
          <div className="w-3/4 py-10">
            <AddJobForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddJob;
