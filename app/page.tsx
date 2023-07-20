import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import CakeList from "@/components/cake-list"
import { InputForm } from "@/components/cake-register"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Who brings the next cake?
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          This is CakeDay!
        </p>
      </div>
      <div className="container flex max-w-[100rem] flex-col items-center gap-4 text-left">
        <InputForm />
        <CakeList />
      </div>
    </section>
  )
}
