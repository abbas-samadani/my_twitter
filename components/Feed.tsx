import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Tweet } from '../typings'
import TweetBox from './TweetBox'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'
interface Props {
  tweets: Tweet[]
}
function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  const handleRefresh = async () => {
    const refteshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Feed Updated!', {
      id: refteshToast,
    })
  }
  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="w-8 h-8 mr-5 mt-5 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125 "
        />
      </div>
      <TweetBox setTweets={setTweets} />
      <div>
        {tweets?.map((tweet) => (
          <TweetComponent tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed
