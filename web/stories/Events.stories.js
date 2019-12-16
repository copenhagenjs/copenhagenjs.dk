import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Events } from '../components/Events'

storiesOf('Events', module).add('Default', () => (
  <Events.tag
    events={[
      {
        title: 'First event',
        date: '1574348400000',
        location: 'JavaScriptRoad 42, Galaxy',
        content: `# CopenhagenJS December - Dwarf.dk\n\nHi everyone 😄\nLast CopenhagenJS meetup of the year and even last CopenhagenJS meetup of this decade. Let us look back on this year and celebrate the good presentations and things there has happened! We will vote before the meetup and announce the results at the event. This is going to be fun!\n\nCopenhagenJS Awards - Annoncement winners\nWe will nominate and make a form where one can vote on what is the best in different categories.\n\n## Schedule:\n\n    17:00 Doors open\n    17:45 Welcome\n    18:00 You?\n    18:25 Break with food and drinks\n    19:00 CopenhagenJS Awards - Annoncement winners\n    19:25 You?\n    19:50 Group photo\n    19:55 Raffle.js\n    20:00 Socializing - meet the community\n    21:00 See you next time!\n\n## What is CopenhagenJS?`
      },
      {
        title: 'Second event',
        date: '1574348400000',
        location: 'JavaScriptRoad 42, Galaxy',
        content: `# CopenhagenJS December - Dwarf.dk\n\nHi everyone 😄\nLast CopenhagenJS meetup of the year and even last CopenhagenJS meetup of this decade. Let us look back on this year and celebrate the good presentations and things there has happened! We will vote before the meetup and announce the results at the event. This is going to be fun!\n\nCopenhagenJS Awards - Annoncement winners\nWe will nominate and make a form where one can vote on what is the best in different categories.\n\n## Schedule:\n\n    17:00 Doors open\n    17:45 Welcome\n    18:00 You?\n    18:25 Break with food and drinks\n    19:00 CopenhagenJS Awards - Annoncement winners\n    19:25 You?\n    19:50 Group photo\n    19:55 Raffle.js\n    20:00 Socializing - meet the community\n    21:00 See you next time!\n\n## What is CopenhagenJS?`
      }
    ]}
  ></Events.tag>
))
