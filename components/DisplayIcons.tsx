import React from 'react'
import {getTechLogos, cn} from "@/lib/utils";
import {relative} from "pathe";
import Image from "next/image";

const DisplayIcons = async ({techStack}:TechIconProps) => {
    const TechIcons = await getTechLogos(techStack);

    return (
        <div className="flex flex-row">{TechIcons.slice(0,3).map(({tech, url},index)=>(
            <div key={tech} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index > 0 && '-ml-3')}>
                <span className="tech-tooltip">{tech}</span>
                <Image src={url} alt={tech} width={100} height={100} className={"size-5"}/>
            </div>
        ))}</div>
    )
}

export default DisplayIcons;
