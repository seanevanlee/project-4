import { useState } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import HeroForm from "../../components/HeroForm/HeroForm";
import * as postsAPI from "../../utils/postApi";
import { useNavigate } from "react-router-dom";

// Return the new stuff (hero/heroultimate) as well as id (which post it knows to be updated)
// Navigate simultaneously back to the other page
// https://beta.reactjs.org/reference/react/useMemo

export default function EditPostPage({ posts, setPosts }) {
  const nav = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  //   const [posts, setPosts] = useState([]);
  const post = useMemo(() => {
    return posts.find((posti) => {
      return posti._id === id;
    });
  }, [id, posts]);
  const [loading, setLoading] = useState(false);

  async function handleEditHero(hero) {
    try {
      setLoading(true);
      const response = await postsAPI.update(hero);
      console.log(response);
      console.log(hero);
      console.log(response, " handle update post");
      //setPosts([response.post, ...posts]);
      setPosts((posts) =>
        posts.map((post) => {
          //  console.log(post);
          // map needs to return something, use curleys.
          //console.log(post._id);
          return post._id === response.id
            ? {
                ...post,
                hero: response.hero,
                heroUltimate: response.heroUltimate,
              }
            : post;
        })
      );
      // Take each post then if ID = what you need then change, if not then leave it alone.
      setLoading(false);
      nav("/");
    } catch (err) {
      console.log(err.message, "error in addPost");
      console.error(err);
      setError("Error creating post, please try again");
    }
  }

  return <HeroForm currentValues={post} handleSubmit={handleEditHero} />;
}

//Add forms start off clean, but edit forms should have pre-exisiting data for the user to change
//For simplicity's sake, get an edit page that looks like a view minus the big feed
//Need ID from params to pass entry through edit post page
//De-structure ID property
//useMemo:
//Rather than re-running on every render, only run it when the parameters change.
//If inputs are familiar, then the outputs use the cached results.
//Find is a function that'll go through the entries then return either true/false
