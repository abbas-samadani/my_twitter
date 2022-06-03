import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import {
  BellIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
  HashtagIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="col-span-2 flex flex-col items-center md:items-start">
      <img className="m-3 w-10 h-10" src="twitter.png" alt="" />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow
        Icon={UserIcon}
        onClick={session ? signOut : signIn}
        title={session ? 'Sign Out' : 'Sign In'}
      />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}

export default Sidebar
