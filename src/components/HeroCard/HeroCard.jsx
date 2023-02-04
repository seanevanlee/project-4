import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { STATES } from "mongoose";

function HeroCard({ post, isProfile, addLike, removeLike, loggedUser }) {
  // const likedIndex = post.likes.findIndex(like => like.username === loggedUser.username)
  // const likeColor = likedIndex > -1 ?'red' : 'grey'
  // const clickHandler = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)
  async function deleteHero(e) {
    await fetch("/api/posts/" + post._id, { method: "DELETE" });
    location.reload();
  }

  return (
    <Card key={post?._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/${post?.user?.username}`}>
              <Image
                size="large"
                avatar
                src={
                  post?.user?.photoUrl
                    ? post?.user?.photoUrl
                    : "https://i.imgur.com/jKNFcgw.png"
                }
              />
              {post?.user?.username}
            </Link>
            <div>
              {post.user._id === loggedUser._id && (
                <Link to={"/posts/edit/" + post._id}>Edit</Link>
              )}
            </div>
            {/* Delete can go under Edit */}
            <div>
              {post.user._id === loggedUser._id && (
                <button onClick={deleteHero}>Delete</button>
              )}
            </div>
          </Card.Header>
        </Card.Content>
      )}

      <Image src={`${post?.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>
          <strong>
            <u>Player's Great Idea:</u>
          </strong>
          <div>
            {" "}
            <b>Suggested Name: </b> {post?.hero}
          </div>
          <div>
            <b> Suggested Ultimate:</b> {post?.heroUltimate}
          </div>
        </Card.Description>
      </Card.Content>
      {/* <Card.Content extra textAlign={"right"}>
            <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler}/>
            {post?.likes.length} Likes
          </Card.Content> */}
    </Card>
  );
}

export default HeroCard;
