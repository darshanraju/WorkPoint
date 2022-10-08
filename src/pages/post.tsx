/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React from "react";
import AddJobForm from "../components/AddJobForm";
import PostNavbar from "../components/PostNavbar";

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
        <link
          rel="stylesheet"
          type="text/css"
          href="//github.com/downloads/lafeber/world-flags-sprite/flags32.css"
        />
        <link
          rel="stylesheet"
          href="https://jsuites.net/v4/jsuites.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js" />
      </Head>
      <main className="dark:bg-gray-900 ">
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-4 lg:px-4 min-w-screen w-full m-0">
          <PostNavbar />
          <div className="flex flex-col items-center">
            <div className="w-full py-10">
              <AddJobForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddJob;