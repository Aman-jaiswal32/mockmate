import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>
            Get interview ready with AI-Powered practice & feedback
          </h2>
          <p className="text-lg">Practice on real time interview questions & get real time feedback</p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an interview</Link>
          </Button>
        </div>
        <Image src="/roboto.png" alt="robot-pic" width={400} height={400} className="max-sm:hidden"/>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your interviews</h2>
        <div className="interviews-section">
            {dummyInterviews.map((interview)=> (
                <InterviewCard {...interview} key={interview.id}/>
            ))}
            { /* <p>you have not taken any interview yet</p>*/}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
            {dummyInterviews.map((interview)=> (
                <InterviewCard {...interview} key={interview.id}/>
            ))}
            {/*} <p>There are no Interviews available</p>*/}
        </div>
      </section>
    </>
  )
}

export default page;