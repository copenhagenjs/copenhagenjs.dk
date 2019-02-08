import React from "react";
import Page from "../components/Page";

export default class Videos extends React.Component {
  render() {
    return (
      <Page>
        <h1>Videos</h1>
        <p>
          <a href="https://www.youtube.com/channel/UCOD8lwED5PAcgmhwymQJsng?view_as=subscriber">
            Subscribe to us on Youtube
          </a>
        </p>
        <p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Zu8P6xejHuU"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/HYqxc_zjqMg"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/VNoDZihhWHI"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </p>
      </Page>
    );
  }
}
