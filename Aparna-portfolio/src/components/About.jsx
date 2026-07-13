import { FaCode } from "react-icons/fa6";
import { assets, profileData } from "../assets/asstes";

const About = () => {
  return (
    <div id="About" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className=" text-slate-700 ">About</span>
              <span className="text-4xl sm:text-5xl font-bold mb-6 text-teal-800">
                Me
              </span>
            </h2>
            <p className="text-md mb-2 leading-8">
             Frontend Developer with over two years of experience building
              responsive, scalable web applications. I specialize in bridging
              the gap between intuitive design and technical execution using
              ReactJS and JavaScript to deliver high-performance digital
              experiences.
            </p>
            <p className="text-md mb-2 leading-8">
              My approach blends creative problem-solving with technical rigor,
              highlighted by a proven track record of optimizing systems and
              reducing page load times by 30%.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
              {profileData.map((data, index) => (
                <div
                  key={index}
                  className="w-full h-55 sm:w-50 p-6 border border-zinc-400 rounded hover:border-zinc-600 cursor-pointer hover:border-b-4 hover:border-r-4 hover:border-b-zinc-800 hover:border-r-zinc-800 transition duration-300 hover:-translate-y-1"
                >
                  <FaCode className="text-3xl mb-4" />
                  <h1 className="text-xl font-bold mb-4">{data.title}</h1>
                  <p>{data.technologies.join(", ")}</p>
                </div>
              ))}
            </div>
            <a
              href="/resume/Aparna_Gavali_Resume.pdf"
              download="Aparna_Gavali_Resume.pdf"
            >
              <button className="px-8 py-4 bg-zinc-700 text-white rounded-full cursor-pointer transition duration-300 hover:bg-zinc-900">
                Download Resume
              </button>
            </a>
          </div>
          {/* <div className="order-1 lg:order-2 flex justify-center">
                <div className="rounded overflow-hidden ">
                    <img className="w-full h-full object-cover" src={assets.profileImg} alt="Profile"/>
                </div>
          </div> */}
          {/* Updated Image Section */}
          <div className="order-1 lg:order-2 flex justify-center items-start">
            <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                className="w-full h-full object-cover"
                src={assets.AboutImg}
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
