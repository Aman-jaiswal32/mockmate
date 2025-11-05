/*import dayjs from "dayjs";
import Image from "next/image";
import {getRandomInterviewCover} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import DisplayIcons from "./DisplayIcons";
import {getFeedbackByInterviewId} from "@/lib/action/general.action";

const InterviewCard = async ({id, userId, role, type, techstack, createdAt}:
                       InterviewCardProps) => {
    const feedback = userId && id
        ? await getFeedbackByInterviewId({interviewId: id, userId}) : null;
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt ||
        Date.now()).format('MMM D, YYYY');
    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image src={getRandomInterviewCover()} alt="cover-image" width={90} height={90}
                           className="rounded-full object-fit size-[90px]"/>
                    <h3 className="mt-5 capitalize">
                        {role} Interview
                    </h3>
                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="/calendar.svg" alt="caledar" width={22} height={22}/>
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Image src="star.svg" alt="star" width={22} height={22}/>
                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>
                    <p className="line-clamp-2 mt-5">
                        {feedback?.finalAssessment|| "you have not taken the interview yet." +
                            " Take the interview to improve your skills"}
                    </p>
                </div>
                <div className="flex flex-row justify-between">
                    <DisplayIcons techStack={techstack}/>
                    <Button className="btn-primary">
                        <Link href={ feedback
                            ? `/interview/${id}/feedback`
                            : `/interview/${id}`
                        }>
                            {feedback ? "Check Feedback" : "view Interview"}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard
*/

/*import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayIcons from "./DisplayIcons";
import { getFeedbackByInterviewId } from "@/lib/action/general.action";
import { getCurrentUser } from "@/lib/action/auth.action"; // ✅ Import current user helper

const InterviewCard = async ({
                                 id,
                                 userId: interviewOwnerId, // renamed for clarity
                                 role,
                                 type,
                                 techstack,
                                 createdAt,
                             }: InterviewCardProps) => {
    // ✅ Always get currently logged-in user
    const currentUser = await getCurrentUser();

    // ✅ Fetch feedback only for the current user
    const feedback =
        currentUser?.id && id
            ? await getFeedbackByInterviewId({
                interviewId: id,
                userId: currentUser.id,
            })
            : null;

    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format(
        "MMM D, YYYY"
    );

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>

                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>


                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover-image"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />


                    <h3 className="mt-5 capitalize">{role} Interview</h3>


                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p>{feedback?.totalScore ?? "---"}/100</p>
                        </div>
                    </div>


                    <p className="line-clamp-2 mt-5">
                        {feedback?.finalAssessment ||
                            "You have not taken the interview yet. Take the interview to improve your skills."}
                    </p>
                </div>


                <div className="flex flex-row justify-between">
                    <DisplayIcons techStack={techstack} />


                    <Button className="btn-primary">
                        <Link
                            href={
                                feedback
                                    ? `/interview/${id}/feedback`
                                    : `/interview/${id}`
                            }
                        >
                            {feedback ? "Check Feedback" : "View Interview"}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;*/

import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayIcons from "./DisplayIcons";
import { getFeedbackByInterviewId } from "@/lib/action/general.action";
import { getCurrentUser } from "@/lib/action/auth.action"; // ✅ Fetch current user

const InterviewCard = async ({
                                 id,
                                 role,
                                 type,
                                 techstack,
                                 createdAt,
                             }: InterviewCardProps) => {
    // ✅ Always get the currently logged-in user
    const currentUser = await getCurrentUser();

    // ✅ Fetch feedback only for the current user
    const feedback =
        currentUser?.id && id
            ? await getFeedbackByInterviewId({
                interviewId: id,
                userId: currentUser.id,
            })
            : null;

    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format(
        "MMM D, YYYY"
    );

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    {/* Type Badge */}
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>

                    {/* Cover Image */}
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover-image"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />

                    {/* Role */}
                    <h3 className="mt-5 capitalize">{role} Interview</h3>

                    {/* Date + Score */}
                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p>{feedback?.totalScore ?? "---"}/100</p>
                        </div>
                    </div>

                    {/* Summary or placeholder */}
                    <p className="line-clamp-2 mt-5">
                        {feedback?.finalAssessment ||
                            "You have not taken the interview yet. Take the interview to improve your skills."}
                    </p>
                </div>

                {/* Footer with TechStack icons + Action Button */}
                <div className="flex flex-row justify-between">
                    <DisplayIcons techStack={techstack} />

                    {/* ✅ Dynamic button based on feedback existence */}
                    <Button className="btn-primary">
                        <Link
                            href={
                                feedback
                                    ? `/interview/${id}/feedback`
                                    : `/interview/${id}`
                            }
                        >
                            {feedback ? "Check Feedback" : "View Interview"}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;

