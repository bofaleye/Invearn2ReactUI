"use client";

import FormInput from "@/components/FormElements/FormInput";
import LandingPageLayout from "@/components/LandingPage/LandingPageLayout";
import { NextPage } from "next";
import { Sora } from "next/font/google";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const Home: NextPage<any> = () => {
  // Elements
  const checkCircle = (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sm:w-[32px] sm:h-[33px] w-[25px] h-[26px]"
    >
      <rect y="0.5" width="32" height="32" rx="16" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.707 11.793C22.8945 11.9806 22.9998 12.2349 22.9998 12.5C22.9998 12.7652 22.8945 13.0195 22.707 13.207L14.707 21.207C14.5195 21.3945 14.2652 21.4998 14 21.4998C13.7348 21.4998 13.4805 21.3945 13.293 21.207L9.29301 17.207C9.11085 17.0184 9.01006 16.7658 9.01234 16.5036C9.01461 16.2414 9.11978 15.9906 9.30519 15.8052C9.4906 15.6198 9.74141 15.5146 10.0036 15.5124C10.2658 15.5101 10.5184 15.6109 10.707 15.793L14 19.086L21.293 11.793C21.4805 11.6056 21.7348 11.5002 22 11.5002C22.2652 11.5002 22.5195 11.6056 22.707 11.793Z"
        fill="#0E9F6E"
      />
    </svg>
  );
  // Company logos

  type LogoItem = {
    name: string;

    alt: string;
  };

  const logos: LogoItem[] = [
    { name: "uba.png", alt: "UBA logo" },

    { name: "unitedCapital.png", alt: "United Capital logo" },

    { name: "transcorp.png", alt: "Transcorp logo" },

    { name: "vfd.png", alt: "VFD logo" },

    { name: "afriland.png", alt: "Afriland Properties logo" },

    { name: "portlandPaints.png", alt: "Portland Paints logo" },
  ];

  // Capital Market Points
  type CapitalMarketPoint = {
    title: string;
    content: string;
  };
  const capitalMarketPoints: CapitalMarketPoint[] = [
    {
      title: "Manage IPO, Right Issue End-to-end",
      content: "Manage IPO, Right Issue End-to-end.",
    },
    {
      title: "Built By Industry Expert",
      content:
        "We have a command of mastery in Registrar business, with Greenpole we have catered for all notable problems in the industry ,we have disrupted ourselves to serve our customers better.",
    },
    {
      title: "Conduct E-AGMS",
      content: "Give your investors access to more offerings.",
    },
  ];

  return (
    <LandingPageLayout>
      {/** Hero Section */}
      <section className="bg-login-background bg-no-repeat bg-cover sm:p-11 p-8">
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col justify-center">
            <h1
              className={`text-white text-semibold lg:text-5xl sm:text-4xl text-3xl ${sora.className}`}
            >
              Automating capital market operations.
            </h1>
            <p className="lg:text-xl text-white font-medium my-8">
              Our mission is to build a bespoke enterprise solution that
              automates the management of your investors’ data.
            </p>
            <div className="my-5 flex sm:space-x-3 space-x-0 sm:flex-row flex-col sm:space-y-0 space-y-5">
              <FormInput
                placeholder="Enter your e-mail address"
                containerClass="flex-1"
              />
              <button
                type="button"
                className="text-white bg-brand-200 hover:bg-brand font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
              >
                Get started
                <BsArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="lg:w-[567px] lg:h-[567px] w-[324px] h-[324px] relative">
              <Image
                src="/images/landing/hero.png"
                fill
                className="w-full h-full top-0 left-0 object-cover"
                alt="Greenpole"
              />
            </div>
          </div>
        </div>
      </section>

      {/** Trusted By Section */}
      <section className="bg-white sm:px-11 sm:py-14 px-8 py-11">
        <h1
          className={`font-extrabold text-gray-900 sm:text-4xl text-2xl text-center ${sora.className}`}
        >
          Our Solution is trusted by
        </h1>
        <div className="flex items-center sm:justify-evenly sm:space-x-0 space-x-8 mt-10 overflow-x-scroll">
          {logos.map((item, i) => (
            <Image
              key={`${i}clg`}
              src={`/images/landing/${item.name}`}
              width={112}
              height={53}
              alt={item.alt}
            />
          ))}
        </div>
      </section>

      {/** Built for conducting section */}
      <section className="bg-brand-100 sm:px-11 sm:py-20 px-8 py-16">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="flex justify-center items-center lg:block hidden">
            <Image
              src="/images/landing/bankHero.png"
              width={612}
              height={674}
              alt="Capital Market Greenpole"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1
              className={`text-semibold lg:text-5xl sm:text-4xl text-3xl text-gray-900 ${sora.className}`}
            >
              Built for conducting financial activities in the capital market.
            </h1>
            <p className="my-8 text-gray-900">
              Greenpole is a secured database management application that allows
              capital market operators manage data, connect and efficiency and
              effectiveness In delivering excellent customer service experience.
            </p>
            <div className="flex flex-col space-y-6 mb-8">
              {capitalMarketPoints.map((item, i) => (
                <div className="inline-flex items-start" key={`${i}crc`}>
                  <span>{checkCircle}</span>
                  <span className="ml-4">
                    <h3
                      className={`font-bold sm:text-xl text-gray-900 mb-2 ${sora.className}`}
                    >
                      {item.title}
                    </h3>
                    <p className="sm:text-base text-sm">{item.content}</p>
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="px-4 py-3 text-sm text-center text-white rounded-lg bg-brand-200 self-start"
            >
              Read More
            </button>
          </div>
        </div>
      </section>

      {/** Simply your capital market operations */}
      <section className="bg-[#F8F8F8] sm:px-11 sm:py-20 px-8 py-16">
        <div className="grid sm:grid-cols-5 grid-cols-1 gap-y-8">
          <div className="flex flex-col justify-center sm:col-span-3 lg:pr-20">
            <h1
              className={`text-semibold lg:text-5xl sm:text-4xl text-3xl text-gray-900 ${sora.className}`}
            >
              Simplify your capital market operations with Greenpole.
            </h1>
            <p className="text-black my-8">
              By automating IPOs, dividend claims, right issues, and other
              operations while providing comprehensive and informative
              reporting, Greenpole enables your capital market administrations
              to reach new heights.
            </p>
            <div className="sm:block flex flex-wrap">
              <button
                type="button"
                className="mr-5 mb-5 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-2 focus:ring-slate-500 focus:outline-none bg-black"
              >
                How it works
              </button>
              <button
                type="button"
                className="text-white self-start bg-brand-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-2 focus:ring-brand-100 focus:outline-none"
              >
                Request for a Demo
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center sm:col-span-2">
            <Image
              src="/images/landing/palmCoin.png"
              width={540}
              height={406}
              alt="Greenpole operations"
            />
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default Home;
