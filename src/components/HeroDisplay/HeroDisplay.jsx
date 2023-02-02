import React from "react";
import { Card, Dimmer, Segment, Image } from "semantic-ui-react";
import HeroCard from "../HeroCard/HeroCard";
// import Loader from '../Loader/Loader';

export default function HeroDisplay({
  posts,
  numPhotosCol,
  isProfile,
  loading,
  addLike,
  removeLike,
  loggedUser,
}) {
  // if(loading){
  //   return (
  //   <Segment>
  //     <Dimmer active inverted>
  //       <Loader size="small">Loading</Loader>
  //     </Dimmer>
  //     <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
  //   </Segment>
  //   )
  // }

  return (
    <Card.Group itemsPerRow={numPhotosCol} stackable>
      {posts.map((post) => {
        return (
          <HeroCard
            post={post}
            key={post._id}
            //   isProfile={isProfile}
            //   addLike={addLike}
            //   removeLike={removeLike}
            //   loggedUser={loggedUser}
          />
        );
      })}
    </Card.Group>
  );
}
