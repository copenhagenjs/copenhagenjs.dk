import marked from 'marked'
import Page from '../components/Page'

const GUIDELINES_TEXT = `
# Speakers guidelines

Please note that these are just for the guiding purpose and making the presentation process easier, and not rules that have to be followed.

* Focus on the presentation - It is important that as a speaker, you take questions after the talk, not during it. This way it is easier to maintain focus on the topic at hand and not deviate.
* Keep it short - our talks usually are composed of 20 minute presentation and 5 minute Q&A
* Make sure your slides are visible - Usually we deal with contrast issues due to various reasons. We would strongly suggest using large fonts and bright backgrounds with dark type on the slides.
* No hiring advertising - We believe in letting the product, and the technologies around it, speak for themselves. This should be enough to spark interest in people.
* Share the presentation(even if you end up modifying parts of it) with the organisers at least three days before the event

For any advice and help that you need when you build the presentation, you can contact the organizers directly. We love to help!

### Checklist for presenting

- Expect to use HDMI, or bring a adapter to be sure
- Disable Night Shift
- Disable Energy Saver (avoid black screen during presenting)
- Check wifi access before starting
- Check contrast to be at least AA https://accessible-colors.com/
- Generate PDF of presentation to share afterwards

https://www.kevinsimper.dk/posts/how-to-give-your-first-presentation

`

export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(GUIDELINES_TEXT) }} />
    </Page>
  )
}
