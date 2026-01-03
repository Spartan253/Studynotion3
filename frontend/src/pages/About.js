import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="w-11/12 max-w-maxContent mx-auto py-20">
        <div className="text-center space-y-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
            About <HighlightText text="StudyNotion" />
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
            StudyNotion is a modern learning platform designed to empower
            students and professionals with real-world coding skills through
            high-quality, industry-driven education.
          </p>
        </div>
      </section>

      {/* MISSION + IMAGE SECTION */}
      <section className="w-[1080px]  mx-auto py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* TEXT */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-xl sm:text-3xl font-semibold">
              Our <HighlightText text="Mission" />
            </h2>

            <p className="text-gray-300 text-sm sm:text-base">
              Our mission is to bridge the gap between traditional education
              and real-world skills by providing hands-on, practical learning
              experiences guided by industry experts.
            </p>

            <p className="text-gray-300 text-sm sm:text-base">
              We believe learning should be accessible, affordable, and
              focused on solving real problems.
            </p>
          </div>

          {/* IMAGE / CARD */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900
                            rounded-2xl p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Why StudyNotion?
              </h3>

              <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                <li>✔ Learn from industry professionals</li>
                <li>✔ Project-based learning approach</li>
                <li>✔ Career-focused curriculum</li>
                <li>✔ Flexible learning at your pace</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gray-900 py-16">
        <div className="w-11/12 max-w-maxContent mx-auto
                        grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

          <div>
            <p className="text-3xl sm:text-4xl font-bold text-yellow-500">10+</p>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Years of Experience
            </p>
          </div>

          <div>
            <p className="text-3xl sm:text-4xl font-bold text-yellow-500">250+</p>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Courses Available
            </p>
          </div>

          <div>
            <p className="text-3xl sm:text-4xl font-bold text-yellow-500">50K+</p>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Learners Empowered
            </p>
          </div>

        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="w-11/12 max-w-maxContent mx-auto py-20">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-3xl font-semibold">
            Our <HighlightText text="Core Values" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-gray-900 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="font-semibold text-lg mb-3">Quality Education</h3>
            <p className="text-gray-300 text-sm">
              We focus on depth, clarity, and real-world relevance.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="font-semibold text-lg mb-3">Student First</h3>
            <p className="text-gray-300 text-sm">
              Every decision we make prioritizes student success.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="font-semibold text-lg mb-3">Innovation</h3>
            <p className="text-gray-300 text-sm">
              We constantly evolve with the tech industry.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-black py-16">
        <div className="w-11/12 max-w-maxContent mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to start your learning journey?
          </h2>

          <p className="mt-4 text-sm sm:text-base">
            Join thousands of learners building real-world skills today.
          </p>

          <button
            className="mt-6 bg-yellow-500 text-black px-8 py-3 rounded-xl
                       hover:scale-95 transition font-semibold"
          >
            <Link to="/signup">
              Get Started
                    </Link>
          
          </button>
        </div>
      </section>

    </div>
  );
}
