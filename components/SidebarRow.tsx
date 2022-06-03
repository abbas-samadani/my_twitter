import React, { SVGProps } from 'react'

interface props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  onClick?: () => {}
}

function SidebarRow({ Icon, title, onClick }: props) {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex content-center max-w-fit space-x-2 px-4 py-3 cursor-pointer transition-all duration-200 group rounded-full hover:bg-gray-100"
    >
      <Icon className="w-6 h-6" />
      <p className="group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  )
}

export default SidebarRow
