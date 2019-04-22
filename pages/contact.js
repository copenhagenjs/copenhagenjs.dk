import Page from '../components/Page'
import TextInput from '../components/TextInput'
import TextArea from '../components/TextArea'
import Button from '../components/Button'

export default () => {
  return (
    <Page>
      <form action="https://formspree.io/kevin.simper@gmail.com" method="POST">
        <TextInput required label="Your name" name="name" />
        <TextInput required type="email" label="Your email" name="email" />
        <TextInput required label="Message title" name="title" />
        <TextArea required label="Message body" name="message" />
        <Button type="submit" display="block" size="lg" margin="20px auto">
          Send
        </Button>
      </form>
    </Page>
  )
}
