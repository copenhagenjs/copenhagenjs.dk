import Page from '../components/Page'
import TextInput from '../components/TextInput'
import TextArea from '../components/TextArea'
import Button from '../components/Button'

export default () => {
  return (
    <Page>
      <h1>Contact us</h1>
      <p>
        You fill out the form here or{' '}
        <a href="mailto:hi@copenhagenjs.dk">hi@copenhagenjs.dk</a>
      </p>
      <form
        action="https://contactform.dk/kevin.simper@gmail.com"
        method="POST"
      >
        <TextInput required label="Your name" name="name" />
        <TextInput required type="email" label="Your email" name="email" />
        <TextInput required label="Title" name="title" />
        <TextArea required label="Message" name="message" />
        <Button type="submit" display="block" size="lg" margin="20px 0">
          Send
        </Button>
      </form>
    </Page>
  )
}
