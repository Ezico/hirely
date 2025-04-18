"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import RightSidebar from "@/components/RightSidebar";
import { toast } from "sonner";

export default function Home() {
  const [step, setStep] = useState(1);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [formData, setFormData] = useState({
    workHistory: "",
    educationHistory: "",
    certifications: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatus = (e) => {
    setStarted(!started);
    document.getElementById("start").style.display = "none";
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);

    document.getElementById("intro").style.display = "none";
    document.getElementById("searching").style.display = "block";
    document.getElementById("companies").style.display = "block";
    document.getElementById("close").click();
    const username = "INFOPOOL";
    const password = "infopool";
    const basicAuth = btoa(`${username}:${password}`);
    console.log(formData);

    try {
      const response = await fetch(
        "https://readyai-452207.uc.r.appspot.com/auth/fullrecommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuth}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setData(data);
        document.getElementById("completed").style.display = "block";
        document.getElementById("companies").style.display = "block";
        document.getElementById("searching").style.display = "none";
      } else {
        toast.error(data.message || "Something went wrong.");
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (error) {
      document.getElementById("companies").style.display = "none";
      document.getElementById("completed").style.display = "none";
      document.getElementById("searching").style.display = "none";
      document.getElementById("intro").style.display = "none";
      toast.error(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };

  return (
    <div>
      <Navbar />
      <section
        id="intro"
        style={{ display: "block" }}
        className="intro md:mx-auto text-center rounded shadow-xl w-full  overflow-hidden p-5"
      >
        <h1
          className="mt-5 text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl 
        text-center"
        >
          Find Your Perfect
          <br className="max-md:hidden" />
          <span className="intro text-white text-center bg-clip-text  ">
            Job Match Instantly
          </span>
        </h1>
        <p className="mt-5 text-lg text-gray-200 sm:text-xl max-w-2xl text-center m-auto">
          Discover tailored job opportunities based on your skills, education
          with <span className="text-orange-400 font-bold">Hirely AI.</span>{" "}
          Smart, fast, and made just for you.
        </p>
        {/* form  */}
        <AlertDialog>
          <AlertDialogTrigger className="m-auto">
            <Button className="font-bold p-5 mt-5">get started? 🚀</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <section id="start">
              <p className="mb-3 text-left text-lg text-white sm:text-xl max-w-2xl  ">
                🎯 Let's Get You Matched!
              </p>
              <p className="text-lg text-gray-200 m-auto ]">
                Let’s help you find a job that actually gets you. Just answer a
                few quick questions about your skills, experiences, and what
                qualifications - and{" "}
                <span className="text-orange-400 font-bold">Hirely AI</span>{" "}
                will send some awesome opportunities your way.
              </p>
            </section>

            {/* form  */}
            <>
              {!started ? (
                <Button onClick={handleStatus}>Proceed</Button>
              ) : (
                <div className=" text-white flex ">
                  <motion.div
                    key={step}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    className=""
                  >
                    <p className="mb-3 text-left text-lg text-white sm:text-xl mt-5 max-w-2xl ">
                      {step === 1 && "💼 What’s your work story?"}
                      {step === 2 && "🎓 Education Background"}
                      {step === 3 && "📜 Any Certifications or Courses?"}
                    </p>

                    <p className="text-lg text-white mb-5">
                      {step === 1 &&
                        "In a sentence or two, share your past work experience — roles, industries, or anything you’ve rocked at!. Whether it’s full-time, part-time, freelance, or even volunteer work - it all counts!"}
                      {step === 2 &&
                        "Tell us about your highest level of education and what you studied. Whether you’ve got a degree or you’re self-taught — it all matters!"}
                      {step === 3 &&
                        "List any certifications or courses you've completed — tech, business, creative, anything that shows you’ve got the skills!List any certifications or online courses you’ve completed — show off those skills!"}
                    </p>

                    <textarea
                      className={cn(
                        "file:text-foreground placeholder:text-gray-500  selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-[130px] w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      )}
                      name={
                        step === 1
                          ? "workHistory"
                          : step === 2
                          ? "educationHistory"
                          : "certifications"
                      }
                      value={
                        step === 1
                          ? formData.workHistory
                          : step === 2
                          ? formData.educationHistory
                          : formData.certifications
                      }
                      onChange={handleChange}
                      placeholder={
                        step === 1
                          ? "E.g., 2 years as a frontend developer, UI/UX designer at TheBabyCotShop London, freelance designer on the side."
                          : step === 2
                          ? "E.g., B.Sc. in Computer Science from UNILAG or self-taught via online bootcamps."
                          : "E.g., Google UX Design Cert, AWS Cloud Practitioner, Meta Frontend Developer."
                      }
                    />

                    <div className="flex justify-between">
                      {step > 1 && (
                        <Button
                          onClick={prevStep}
                          className="px-4 py-2font-bold p-5 mt-5"
                          variant="outline"
                        >
                          Back
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          onClick={nextStep}
                          className="ml-auto px-4 py-2font-bold p-5 mt-5"
                          variant="outline"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          className="ml-auto px-4 py-2font-bold p-5 mt-5"
                          //   variant="outline"
                        >
                          {loading ? "Submitting..." : "Finish & See Matches"}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </>
            {/* form end  */}

            <AlertDialogFooter>
              <AlertDialogCancel id="close">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <section className=" intro md:mx-auto rounded shadow-xl w-full  overflow-hidden p-5">
        <div
          id="searching"
          style={{ display: "none" }}
          className="animate animate-in zoom-in-75 w-full  overflow-hidden p-5"
        >
          <h1
            className="mt-5 text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl 
        text-center"
          >
            <span className="text-orange-400 font-bold"> Hirely AI</span> is
            searching
            <br className="max-md:hidden" />
            <span className="intro text-white text-center bg-clip-text  ">
              for a perfect match
            </span>
          </h1>
        </div>

        <div
          style={{ display: "none" }}
          id="completed"
          className="animate animate-in zoom-in-75 w-full  overflow-hidden p-5"
        >
          <h1
            className="mt-5 text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl 
        text-center"
          >
            🎉 Congratulations 🎉
            <br className="max-md:hidden" />
            <span className="intro text-white text-center bg-clip-text  ">
              Your Matches Are Here!
            </span>
          </h1>
          <p className="mt-5 text-lg text-gray-200 sm:text-xl max-w-2xl text-center m-auto">
            We've found some exciting companies that align perfectly with your
            skills and experience. Explore your opportunities below!
          </p>
        </div>

        <div
          id="companies"
          style={{ display: "none" }}
          className="animate animate-in zoom-in-75"
        >
          <RightSidebar data={data} />
        </div>
      </section>
    </div>
  );
}
