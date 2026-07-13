import {
  FaCode,
  FaDesktop,
  FaMicrochip,
  FaMobile,
  FaReact,
  FaSchool,
} from "react-icons/fa6";
import profileImg from "../assets/Aparna.jpeg";
import heroImage from '../assets/hero.png'
import AboutImg from "../assets/about.png";

import { FaProjectDiagram } from "react-icons/fa";

export const assets = {
  profileImg,AboutImg,heroImage
};

export const navMenu = ["Home", "Work", "Skills", "About", "Contact"];

export const skillsData = [
  {
    icon: FaMicrochip,
    title: "Backend",
    technologies: ["MongoDB", "nodeJS", "SQL"],
  },
  {
    icon: FaReact,
    title: "Frontend",
    technologies: ["React", "Html", "Css", "Tailwindcss","javascript"],
  },
  // {
  //   icon: FaDesktop,
  //   title: "Web",
  //   technologies: ["Nginx", "Linux", "Wsgi", "Server"],
  // },
  {
    icon: FaCode,
    title: "Deployment",
    technologies: ["Netlify", "Git", "Github", "Vercel"],
  },
  {
    icon: FaMobile,
    title: "Mobile",
    technologies: ["Responsive-design", "Desktop-view", "Mobile-view"],
  },
];

export const projectData = [
  {
    title: "VR ENTERPRISES",
    description: "Developed a high-converting website for a premium safety net provider, focusing on fast load times and a user-centric design to drive business growth.",
    image:
      "/project-images/VR.png",
    tech: ["HTML5", "CSS3", "JavaScript"],
    projectLink: "",
    liveDemo: "https://vrenterprises-official.netlify.app/",
  },
  {
    title: "Nirmal Developers",
    description:
      "A professional website built for Nirmal Developers to effectively present their construction expertise, transparent client relationships, and track record of on-time delivery.",
    // image: 'https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2plY3R8ZW58MHx8MHx8fDA%3D',
    image:"/project-images/nirmal.png",

    tech: ["JavaScript","ReactJs", "Tailwindcss", "vite"],
    projectLink: "",
    liveDemo: "https://nirmal-developers.netlify.app/",
  },
  {
    title: "Nanda Aluminium",
    description:
      "A clean, user-centric website built for Nanda Aluminium, designed to showcase their expertise in durable fabrication, modern glass solutions, and commercial design.",
    image:
      "/public/project-images/nanda.png",
    tech: ["JavaScript","ReactJs", "Tailwindcss", "vite"],
    projectLink: "",
    liveDemo: "https://nanda-aluminium.netlify.app/",
  },
  {
    title: "Layer&Lift",
    description: "A modern, responsive web application designed for Layer & Lift Salon to showcase their premium styling services, highlight their artistic portfolio, and provide a seamless booking experience for clients.",
    image:
      "/project-images/layerlift.png",
    tech: ["Javascript", "Tailwindcss", "ReactJs", "vite"],
    projectLink: "",
    liveDemo: "https://layerandlift.netlify.app/",
  },
];

export const profileData = [
  {
    icon: FaCode,
    title: "Technologies",
    technologies: ["HTML5","CSS3","JavaScript", "React", "Tailwindcss","nodeJs","MongoDB"],
  },
  {
    icon: FaSchool,
    title: "Education",
    technologies: ["BE in Compuer Science"],
  },
  {
    icon: FaProjectDiagram,
    title: "Projects",
    technologies: ["Built more than 10+"],
  },
];
