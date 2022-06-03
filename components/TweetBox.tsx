import {
  CalculatorIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [imageBoxIsOpen, setImageBoxIsOpen] = useState<boolean>(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!imageInputRef.current?.value) return
    setImage(imageInputRef.current.value)
    setImageBoxIsOpen(false)
  }
  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'avatar.png',
      image: image,
    }

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json()
    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet Posted', {
      icon: '✔',
    })

    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    postTweet()

    setInput('')
    setImage('')
    setImageBoxIsOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={session?.user?.image || 'avatar.png'}
        alt="avatar"
        className="mt-4 h-14 w-14 rounded-full object-cover"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            type="text"
            placeholder="what's Happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={(e) => setImageBoxIsOpen(!imageBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalculatorIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleSubmit}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
              disabled={!input || !session}
            >
              Tweet
            </button>
          </div>
          {imageBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image Url..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}
          {image && (
            <img
              src={image}
              alt="image"
              className="h-40 w-full mt-10 rounded-xl object-contain shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
