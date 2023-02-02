import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function HeroCard({ post, isProfile, addLike, removeLike, loggedUser }) {
  // const likedIndex = post.likes.findIndex(like => like.username === loggedUser.username)
  // const likeColor = likedIndex > -1 ?'red' : 'grey'
  // const clickHandler = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)
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
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {post?.user?.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}

      <Image src={`${post?.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>
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
