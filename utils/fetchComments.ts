import Comment from '../typings'

export const fetchComments = async (tweetId: string) => {        
    const res = await fetch(`/api/getComments?tweetId=${tweetId}`);    
    const comments= await res.clone().json();
    return comments
}

