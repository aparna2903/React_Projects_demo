
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { FaArrowRight } from "react-icons/fa6";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const publicKey = "Q4Anf-zrfw0W08uIf";
    const serviceId = "service_jc2ymna";
    const templateId = "template_e912yip";
     
    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current.reset();
          // Optional: Clear status after 5 seconds
          setTimeout(() => setStatus(""), 5000);
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          console.log("FAILED...", error.text);
        },
      );
  };

  return (
    <div id="Contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-teal-800">
            Get In <span className="text-slate-700">Touch</span>
          </h1>
          <p className="mb-2">
            Have a project in mind or want to discuss potential opportunities?
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6" ref={form} onSubmit={sendEmail}>
            {/* Hidden inputs to pass required template variables */}
            <input type="hidden" name="to_name" value="Your Name" />
            <input type="hidden" name="to_email" value="your-email@example.com" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  className="px-4 py-3 w-full border border-zinc-500 rounded outline-none"
                  type="text"
                  name="from_name"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div>
                <input
                  className="px-4 py-3 w-full border border-zinc-500 rounded outline-none"
                  type="email"
                  name="from_email"
                  placeholder="Enter Email"
                  required
                />
              </div>
            </div>
            <div>
              <input
                className="px-4 py-3 w-full border border-zinc-500 rounded outline-none"
                placeholder="Enter Subject"
                type="text"
                name="subject"
              />
            </div>
            <div>
              <textarea
                className="px-4 py-3 w-full h-40 border border-zinc-500 rounded outline-none"
                placeholder="Enter Message"
                name="message"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-4 bg-zinc-800 text-white text-center cursor-pointer hover:bg-zinc-900 transition rounded-full"
              >
                Send Message
                <FaArrowRight className="text-sm" />
              </button>
              
              {status && (
                <p className={`font-semibold ${status.includes("successfully") ? "text-teal-800" : "text-red-600"}`}>
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;