import User from "../models/user.js";
import Post from "../models/post.js";
// import S3 from "aws-sdk/clients/s3.js";
// const s3 = new S3();
import { s3 } from "../config/s3-config.js";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = process.env.BUCKET_NAME;

export default {
  create,
  index,
  update,
};

function update(req, res) {
  // Take ID to find the one to update
  // apiPosts/:id
  const { id } = req.params;
  const { hero, heroUltimate } = req.body;
  console.log("UPDATING " + hero);
  console.log("heroUltimate: ", heroUltimate);
  Post.findByIdAndUpdate(id, { hero, heroUltimate }).then((newHero) => {
    //console.log({...newHero, hero, heroUltimate });
    res.json({ id, hero, heroUltimate });
  });
}

// Add a use navigate to front-end/form's handlesubmit to connect front/back ends with new stuff so you don't have to refresh
function create(req, res) {
  console.log(req.user, " <- req.user", req.body, req.file);

  if (!req.file) return res.status(400).json({ err: "No file was submitted" });

  const key = `dotaproject/posts/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    console.log("========================");
    console.log(err, " err from aws");
    console.log("========================");
    if (err)
      return res.status(400).json({ err: "Check terminal error from aws" });

    try {
      const post = await Post.create({
        user: req.user._id,
        hero: req.body.hero,
        heroUltimate: req.body.heroUltimate,
        photoUrl: data.Location, // <- this is from aws, it is the URL that our picture exists at in s3 bucket
      });

      await post.populate("user");
      res.status(201).json({ post });
    } catch (err) {
      res.status(400).json({ err });
    }
  });
}

async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ err });
  }
}
