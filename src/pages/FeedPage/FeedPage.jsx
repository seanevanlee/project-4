import PageHeader from "../../components/PageHeader/PageHeader";
import AddHeroForm from "../../components/AddHeroForm/AddHeroForm";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Grid } from "semantic-ui-react";
import HeroDisplay from "../../components/HeroDisplay/HeroDisplay";
import * as postsAPI from "../../utils/postApi";
// import * as likesAPI from "../../utils/likeApi";

function FeedPage({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // async function addLike(postId) {
  //     // postId exists in the card component
  //     try {
  //       const response = await likesAPI.create(postId);
  //       console.log(response, " response from likes APi");
  //       // update the cards with likes array
  //       getPosts();// getPosts updates our state, so we'll see a change in the UI, heart will go to red
  //     } catch (err) {
  //       console.log(err.message, " add like");
  //     }
  //   }

  //   async function removeLike(likeId) {
  //     // postId exists in the card component
  //     try {
  //       const response = await likesAPI.deleteLike(likeId);
  //       console.log(response, " response from likes APi");
  //       // update the cards with likes array
  //       getPosts();// getPosts updates our state, so we'll see a change in the UI, heart will go to grey
  //     } catch (err) {
  //       console.log(err.message, " remove like");
  //     }
  //   }

  async function handleAddPost(post) {
    try {
      setLoading(true);
      const response = await postsAPI.create(post);
      console.log(response, " handle add post");
      setPosts([response.post, ...posts]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, "error in addPost");
      setError("Error creating post, please try again");
    }
  }

  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, " data");
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error in getPosts");
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <ErrorMessage error={error} />;
      </>
    );
  }
  return (
    // <h1><img src="https://i.imgur.com/V3xCnrV.jpg" alt="base holder" width="700" height="600"></img></h1>
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddHeroForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <HeroDisplay
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            // loading={loading}
            // addLike={addLike}
            // removeLike={removeLike}
            loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FeedPage;
