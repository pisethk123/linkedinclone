import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import axiosInstance from "../libs/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";

const Homepage = () => {
  const {data: authUser} = useQuery({queryKey: ["authUser"]})

  const {data: recommendedUsers} = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/user/suggestions")
        return res.data
      } catch (error) {
        toast.error("error fetching recommended users")
      }
    }
  })

  const {data: posts} = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/post")
        return res.data
      } catch (error) {
        toast.error("error fetching posts")
      }
    }
  })

  return <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="hidden lg:block lg:col-span-1">
      <Sidebar user={authUser}/>
    </div>

    <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
      <PostCreation user={authUser}/>
      {posts?.map(post => <Post key={post._id} post={post} />)}

      {
        posts?.length === 0 && <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mb-6">
            <Users size={64} className="mx-auto text-blue-500"/>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">No post yet</h2>
          <p className="text-gray-600 mb-6">Connect with others to start seeing post in your feed!</p>
        </div>
      }
    </div>

    {
      recommendedUsers?.length > 0 && <div className="col-span-1 lg:col-span-1 hidden lg:block">
        <div className="bg-secondary rounded-lg shadow p-4">
          <h2 className="font-semibold mb-4">People you may know</h2>
          {
            recommendedUsers?.map(user => <RecommendedUser key={user._id} user={user}/>)
          }
        </div>
      </div>
    }
  </div>;
};

export default Homepage;
