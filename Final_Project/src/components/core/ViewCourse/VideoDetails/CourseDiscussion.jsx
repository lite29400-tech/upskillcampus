import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { apiConnector } from "../../../../services/apiConnector"
// You might need to add endpoints to apis.js first, but I will hardcode or standardise later. 
// Ideally I should update apis.js
import { courseEndpoints } from "../../../../services/apis"
import IconBtn from "../../../common/IconBtn"
import { toast } from "react-hot-toast"

const CourseDiscussion = ({ subSectionId }) => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [loading, setLoading] = useState(false)

    // Define endpoints directly here if not in apis.js yet, or update apis.js
    // I will use raw strings for now or update apis.js in parallel. 
    // Let's assume I appended them to courseEndpoints in apis.js effectively (I haven't yet, so I will do that next).
    const GET_COMMENTS_API = import.meta.env.VITE_APP_BASE_URL + "/course/getComments/"
    const ADD_COMMENT_API = import.meta.env.VITE_APP_BASE_URL + "/course/addComment"

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await apiConnector("GET", GET_COMMENTS_API + subSectionId, null, {
                    Authorization: `Bearer ${token}`,
                })
                if (response?.data?.success) {
                    setComments(response.data.data)
                }
            } catch (error) {
                console.log("Could not fetch comments")
            }
        }
        if (subSectionId) {
            fetchComments()
        }
    }, [subSectionId, token])

    const handleAddComment = async () => {
        if (!newComment) return
        setLoading(true)
        try {
            const response = await apiConnector("POST", ADD_COMMENT_API, {
                subSectionId,
                comment: newComment,
            }, {
                Authorization: `Bearer ${token}`,
            })

            if (response?.data?.success) {
                // Add new comment to list strictly or refetch
                // The backend returns the populated comment in data
                setComments([response.data.data, ...comments])
                setNewComment("")
                toast.success("Comment added")
            }
        } catch (error) {
            console.log("Error adding comment", error)
            toast.error("Could not add comment")
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-4 py-8">
            <h3 className="text-2xl font-bold">Discussion</h3>

            {/* Input */}
            <div className="flex flex-col gap-2">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ask a question or share your thoughts..."
                    className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                    rows={3}
                />
                <div className="flex justify-end">
                    <IconBtn
                        text="Post Comment"
                        onclick={handleAddComment}
                        disabled={loading}
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4 mt-4">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="flex gap-3 border-b border-richblack-700 pb-4 last:border-0">
                            <img
                                src={comment.user.image}
                                alt="user"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="flex flex-col w-full">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-richblack-5">
                                        {comment.user.firstName} {comment.user.lastName}
                                    </p>
                                    <p className="text-xs text-richblack-300">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <p className="text-richblack-200 mt-1 text-sm">{comment.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-richblack-300">No comments yet. Be the first to start the discussion!</p>
                )}
            </div>
        </div>
    )
}

export default CourseDiscussion
