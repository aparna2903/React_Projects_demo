

import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      id="About"
      className="container mx-auto px-6 md:px-10 lg:px-32 w-full py-12"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        About <span className="underline underline-offset-4 decoration-1 font-light">Our Brand</span>
      </h1>

      <p className="text-gray-500 max-w-80 text-center mx-auto mb-8">
        Passionate about Properties, Dedicated to Your Vision
      </p>

      {/* MAIN WRAPPER */}
      <div className="flex flex-col md:flex-row gap-14 md:gap-20 items-center md:items-center">

        {/* IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.brand_img}
            alt="Brand"
            className="w-full max-w-xl object-cover rounded-lg"
          />
        </div>

        {/* CONTENT - vertically centered */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-gray-600 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <div>
              <p className="text-4xl font-medium text-gray-800">10+</p>
              <p>Years of Excellence</p>
            </div>

            <div>
              <p className="text-4xl font-medium text-gray-800">12+</p>
              <p>Projects Completed</p>
            </div>

            <div>
              <p className="text-4xl font-medium text-gray-800">20+</p>
              <p>Mn. Sq. Ft. Delivered</p>
            </div>

            <div>
              <p className="text-4xl font-medium text-gray-800">25+</p>
              <p>Ongoing projects</p>
            </div>
          </div>

          <p className="max-w-lg text-center md:text-left">
            “Built on trust and dedication, our team has helped countless clients find homes
            that truly reflect their needs. Our experience, market knowledge, and commitment
            to excellence make us a trusted name in real estate.”
          </p>

          <button className="bg-blue-600 text-white px-8 py-2 rounded">
            Learn More
          </button>
        </div>

      </div>
    </motion.div>
  )
}

export default About
