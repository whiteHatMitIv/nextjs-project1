"use client";

import Profile from "@/components/Profile";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OtherProfile = () => {
  const [userName, setuserName] = useState("");
  const [userPosts, setuserPosts] = useState([]);

  const searchParams = useSearchParams(); // Pour lire les paramètres de l'URL
  const params = useParams(); // Pour accéder aux paramètres dynamiques

  useEffect(() => {
    const name = searchParams.get("name");
    if (name) {
      setuserName(name);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!params?.id) return; // Assure que `id` est disponible avant la requête

      try {
        const response = await fetch(`/api/users/${params.id}/posts`);
        const data = await response.json();

        setuserPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [params]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={userPosts}
    />
  );
};

export default OtherProfile;
