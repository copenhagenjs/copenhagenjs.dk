import http from "http";
import { Feed } from "feed";
import data from "../../_posts/_data.json";
import { readFileSync } from "fs";
import fm from "front-matter";
import marked from "marked";

const feed = new Feed({
  title: "CopenhagenJS",
  description: "A monthly meetup about JavaScript in Copenhagen",
  id: "http://copenhagenjs.dk/",
  link: "http://copenhagenjs.dk/",
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "https://copenhagenjs.dk/static/images/cphjs.png",
  favicon: "https://copenhagenjs.dk/static/images/cphjs.png",
  generator: "" // optional, default = 'Feed for Node.js'
});

data.posts.forEach(post => {
  const markdown = readFileSync("../../_posts/" + post, "utf8");
  const parsed = fm(markdown);
  const date = parsed.attributes.date
    ? new Date(parsed.attributes.date + " GMT+0200")
    : new Date(
        post
          .split("-")
          .slice(0, 2)
          .join("-") + " GMT+0200"
      );
  feed.addItem({
    title: parsed.attributes.title || post.replace(".md", ""),
    id: `https://copenhagenjs.dk/archive/${post.replace(".md", "")}/`,
    link: `https://copenhagenjs.dk/archive/${post.replace(".md", "")}/`,
    description: marked(markdown),
    content: marked(markdown),
    date
  });
});

const PORT = process.env.PORT || 9000;
http
  .createServer((req, res) => {
    console.log("New connection");
    res.setHeader("Content-Type", "application/atom+xml");
    res.end(feed.atom1());
  })
  .listen(PORT, () => console.log("Listening on localhost:" + PORT));
