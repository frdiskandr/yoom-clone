'use client'
import { SideBarLink } from "@/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TypeLink = {
  imgUrl: string;
  route: string;
  label: string;
};

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <section
      className="sticky top-0 left-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white
   max-sm:hidden lg:w-67"
    >
      <div className="flex flex-1 flex-col gap-6">
        {SideBarLink.map((link: TypeLink) => {
          const isActive = pathName === link.route || pathName.startsWith(link.route)

          return (
            <Link 
            href={link.route}
            key={link.label}
            className={cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
              'bg-blue-100': isActive
            })}>
              {link.label}
            </Link>
          )
        })}
      </div>
    </section>
  );
};

export default Sidebar;
