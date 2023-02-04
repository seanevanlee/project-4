// Have your username here along with your favorite hero and then your new hero ideas.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image, Grid, Segment } from "semantic-ui-react";
import HeroCard from "../HeroCard/HeroCard";

function PlayerBio({ loggedUser }) {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`/api/users/${username}`);

      if (!response.ok) {
        console.error("Something went wrong.");
        return;
      }

      const { data, user } = await response.json();
      setUser(user);
      setHeroes(data);
    }

    getUser();
  }, []);

  return (
    <Grid textAlign="center" columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Image
            src={`${
              user.photoUrl ? user.photoUrl : "https://i.imgur.com/jKNFcgw.png"
            } `}
            avatar
            size="small"
          />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <Segment vertical>
            <h3>{user.username}</h3>
          </Segment>
          <Segment>
            <span> Dota 2 Player! </span>

            {heroes.map((hero) => {
              //console.log(post);
              return (
                <HeroCard
                  post={hero}
                  key={hero._id}
                  //   isProfile={isProfile}
                  //   addLike={addLike}
                  //   removeLike={removeLike}
                  loggedUser={loggedUser}
                />
              );
            })}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default PlayerBio;
