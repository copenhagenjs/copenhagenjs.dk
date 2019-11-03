const videosData = require("../../data/videos.js");
const { slugify } = require("../services/slug.js");

export const prepareVideos = () => {
  return videosData.videos.map(v => ({
    youtubeId: v[0],
    title: v[1],
    name: v[2],
    speakerSlug: slugify(v[2]),
    slug: slugify(v[2] + " " + v[1])
  }));
};

export const videos = () => {
  return prepareVideos();
};

export const video = (parent, { slug }) => {
  return prepareVideos().find(i => i.slug === slug);
};
