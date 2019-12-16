import marked from 'marked'
import Page from '../components/Page'

let text = `
# Menu

Here you can find links to all of CopenhagenJS resources.

- [Events](/events/)
- [Search](/search/)
- [About](/about/)
- [Videos](/videos/)
- [Learn](/learn/)
- [Contact](/contact/)
- [Code of Conduct](/code-of-conduct/)
- [Speaker Guidelines](/guidelines/)
- [Presentations](/presentations/)
- [Speakers](/speakers/)
- [Your profile](/profile/)
`
export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </Page>
  )
}
