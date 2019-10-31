jest.mock("../../data/videos.js");
const videosData = require("../../data/videos.js");
import { video, videos } from "./videos.js";

test("video should be defined", () => {
  expect(video).toBeDefined();
});

test("call videos", () => {
  videosData.videos = [
    [
      "Zu8P6xejHuU",
      "Shape your workflows with custom eslint plugins",
      "Peter Müller"
    ]
  ];
  expect(videos()).toEqual([
    {
      name: "Peter Müller",
      slug: "peter-muller-shape-your-workflows-with-custom-eslint-plugins",
      title: "Shape your workflows with custom eslint plugins",
      youtubeId: "Zu8P6xejHuU"
    }
  ]);
});
