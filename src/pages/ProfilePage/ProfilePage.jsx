// function ProfilePage(){
//     return(
//         <h1>PROFILE PAGE</h1>
//     )
// }

// export default ProfilePage;

import { useState, useEffect } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { useParams } from "react-router-dom";

import { Grid } from "semantic-ui-react";

import userService from "../../utils/userService";

function ProfilePage({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { username } = useParams(); // { username} matches the the route in your App.js <route path='/:username'>

  console.log("username in Profile page -> ", username);

  async function getProfile() {
    try {
      // making the API CALL
      const response = await userService.getProfile(username);

      setLoading(false); // set loading to false
      setPosts(response.data);
      setProfileUser(response.user);
      console.log(response, " <- data is getprofile");
    } catch (err) {
      console.log(
        err.message,
        " error in getProfile something went wrong with the getProfile api request, check server terminal"
      );
      setLoading(false);
      setError("Profile does not exist"); // <- this is what we show
      // on the page
    }
  }

  useEffect(() => {
    getProfile();
  }, [username]);

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <Loader />
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostDisplay
            posts={posts}
            numPhotosCol={3}
            isProfile={true}
            loading={loading}
            loggedUser={loggedUser}
            // addLike={addLike}
            // removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ProfilePage;
