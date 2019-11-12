import marked from 'marked'
import Page from '../components/Page'

let text = `
# Code of Conduct

CopenhagenJS aims to provide a harassment-free meetup experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of meetup participants in any form.

Sexual language and imagery is not appropriate for any meetup venue, including talks, workshops, parties, Twitter and other online media. Meetup participants violating these rules may be sanctioned or expelled from the meetup without a refund at the discretion of the meetup organisers.

If alcohol is offered at a venue, drink respectfully, respect others choices not to do so.`

export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </Page>
  )
}
