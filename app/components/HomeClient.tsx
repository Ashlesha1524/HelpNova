"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, Feature, motion } from "motion/react";
import axios from "axios";
import { useRouter } from "next/navigation";

function HomeClient({ email }: { email: string }) {

  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = "/api/auth/login";
  };

  const firstLetter = email ? email[0].toUpperCase() : " ";
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node))
        setOpen(false)

    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])
  const navigate=useRouter()
  const features=[
    {
      title:"Plug and Play",
      description:"Easily integrate our AI assistant into your website with just a few clicks."

    },
    {
      title:"Admin Controlled",
      description:"Manage and customize your AI assistant's responses and behavior."
    },
    {
      title:"Always Online",
      description:"Provide instant support to your customers 24/7."
    }
  ]


const handleLogout = async () => {
  try {
    const result = await axios.get("/api/auth/logout");
    window.location.href = "/";
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-zinc-50 text-zinc-900 overflow-x-hidden">

      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="text-lg font-semibold tracking-tight">
            Help<span className="text-zinc-400">Nova</span>
          </div>

          {email ? (
            <div className="relative" ref={popupRef}>
              <button
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition"
                onClick={() => setOpen(!open)}
              >
                {firstLetter}
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-3 w-44 bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden"
                  >
                    <button className="w-full px-4 py-3 text-left hover:bg-zinc-100" onClick={()=>navigate.push("/dashboard")}>
                      Dashboard
                    </button>

                    <button className="w-full px-4 py-3 text-left text-red-600 hover:bg-zinc-100" onClick={handleLogout}>
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ) : (
            <button
              className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          )}

        </div>
      </motion.div>
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              AI Customer Support<br />Built for Modern Websites
            </h1>
            <p className="text-lg text-zinc-600 mt-6 max-w-xl">
              Add a powerful AI assistant to your website in minutes. No code, no hassle, just instant support for your customers around the clock.
            </p>
            <div className='mt-10 flex gap-4'>


              {email ? <button className="px-7 py-3 rounded-xl bg-black text-white font-medium 
              hover:bg-zinc-800 transition disabled:opacity-60" onClick={()=>navigate.push("/dashboard")}>Go to dashboard</button> : <button className="px-7 py-3 rounded-xl bg-black text-white font-medium 
              hover:bg-zinc-800 transition disabled:opacity-60"

                onClick={handleLogin}
              >Get Started</button>}
              <a href='#feature' className="px-7 py-3 text-zinc-700 border border-zinc-300 rounded-xl hover:bg-zinc-100 transition">Learn More</a>
            </div>



          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
              <div className="text-sm text-zinc-500 mb-3">Live Chat Preview</div>
              <div className="flex flex-col gap-3">

                {/* User Question */}
                <div className="bg-black text-white rounded-xl px-4 py-2 text-sm ml-auto w-fit">
                  Do you offer cash on delivery?
                </div>

                {/* AI Reply */}
                <div className="bg-blue-100 text-blue-900 rounded-xl px-4 py-2 text-sm w-fit">
                  Yes, Cash On Delivery is available.
                </div>
                 <motion.div
                  animate={{y:[0, -12, 0]}}
                  transition={{duration:3, repeat:Infinity}}
                  className="absolute -bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl"
                 >

                  🗨️

            </motion.div>

              </div>
            </div>

           
          </motion.div>

        </div>
      </section>
      <section
      id="feature"
        className="bg-zinc-50 py-28 px-6 border-t border-zinc-200"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
          initial={{opacity:0, y:20}}
          whileInView={{opacity:1, y:0}}
          viewport={{once:false}}
          transition={{duration:0.5}}

          className="text-3xl font-semibold text-center ">
            Why Choose HelpNova?
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index)=>(
              <motion.div
                key={index}
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:false}}
                transition={{delay:index*0.1}}
                className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-200"
              >
                <h1 className="text-lg font-medium">{feature.title}</h1>
                <p className="mt-3 text-zinc-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

        </div>

      </section>

      <footer className='py-10 text-center text-sm text-zinc-500'>
        &copy; {new Date().getFullYear()} HelpNova. All rights reserved.
      </footer>

    </div>
  );
}

export default HomeClient;