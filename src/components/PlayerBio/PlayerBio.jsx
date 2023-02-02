// Have your username here along with your favorite hero and then your new hero ideas.

import { Image, Grid, Segment } from "semantic-ui-react";

function PlayerBio({ user }) {
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
            <span> Bio: {user.bio}</span>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ProfileBio;
