import { RiGroup2Fill } from "react-icons/ri"
import { BsFillChatLeftTextFill } from "react-icons/bs"
import { MdOutlinePrivacyTip } from "react-icons/md"
import { GiJoint } from "react-icons/gi"
import { FaShare } from "react-icons/fa"
import { motion } from "framer-motion"
import { CgProfile } from "react-icons/cg"
import { IoIosCreate } from "react-icons/io"
import { BsFillChatRightDotsFill, BsShareFill } from "react-icons/bs"

export default function Landing() {
  return (
    <div className="h-fit flex flex-col mt-10 md:items-center lg:mt-10">
     <section>
         <header className="text-center">
        <div className="text-5xl ">Hi!</div>
        <div className="text-2xl">Welcome to CoNvErSaTe</div>
      </header>
      <main>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" ,stiffness: 300}} className="flex justify-center text-9xl">
          <RiGroup2Fill />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" ,stiffness: 300}} >
           <h1 className="font-mono text-center text-lg md:w-3/6 mx-auto">CoNvErSaTe is a room based messaging platform that enables people to connect and exchange on various aspects of our daily lives</h1>
        </motion.div>
      </main>
      <main className="mt-20 font-mono md:flex flex-col items-center lg:mt-40">
         <h1 className="text-5xl text-center">Features</h1>
         <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1}} transition={{ type: "spring", stiffness: 200}} className="flex gap-3 m-1 mt-5">
           <div className="text-5xl">
           <BsFillChatLeftTextFill />
         </div>
         <div className="text-2xl mt-2">Instant Messaging</div>
         </motion.div>
         <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1}} transition={{ type: "spring", stiffness: 200}} className="flex gap-2 m-1 mt-5">
            <div className="text-5xl">
              <FaShare />
            </div>
            <div className="text-2xl mt-2">Share Your Rooms</div>
         </motion.div>
         <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1}} transition={{ type: "spring", stiffness: 200}} className="flex gap-2 m-1 mt-5">
            <div className="text-5xl">
              <GiJoint />
            </div>
            <div className="text-2xl mt-2">Join Other Rooms</div>
         </motion.div>
         <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1}} transition={{ type: "spring", stiffness: 200, duration: 4}} className="flex gap-2 m-1 mt-5">
            <div className="text-5xl">
              <MdOutlinePrivacyTip />
            </div>
            <div className="text-2xl mt-2">Protected Privacy</div>
         </motion.div>
      </main>
      <main className="mt-20 font-mono">
         <h1 className="text-5xl text-center">Get Started</h1>
        <section className="md: flex flex-col items-center">
           <div className=" flex flex-col items-center gap-2 shadow shadow-black m-3 rounded p-1 md:w-80">
            <div className="text-7xl">
              <CgProfile />
            </div>
            <div className="text-2xl">Set Up Your Profile</div>
         </div>
         <div className=" flex flex-col items-center gap-2 shadow shadow-black m-3 rounded p-1 md:w-80">
            <div className="text-7xl">
              <IoIosCreate />
            </div>
            <div className="text-2xl">Create Your Room</div>
         </div>
         <div className=" flex flex-col items-center gap-2 shadow shadow-black m-3 rounded p-1 md:w-80">
            <div className="text-7xl">
              <BsFillChatRightDotsFill />
            </div>
            <div className="text-2xl">Start Chatting</div>
         </div>
         <div className=" flex flex-col items-center gap-2 shadow shadow-black m-3 rounded p-1 md:w-80">
            <div className="text-7xl">
              <BsShareFill />
            </div>
            <div className="text-2xl">Connect With Friends</div>
         </div>
        </section>
      </main>
     </section>
     
     <footer>&copy;All rights reserved ==== Convertsate 2023</footer>
    </div>
  );
}
