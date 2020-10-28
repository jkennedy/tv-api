import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { calendar_v3 } from 'googleapis';
import { google } from 'googleapis';
import * as _ from "lodash";

@Injectable()
export class EventService {
  constructor(private readonly userService: UserService) { }

  async getTodaysEvents(user: UserEntity) {
    const calendar = google.calendar({
      version: 'v3',
      // this header will be present for every request
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });

  }
}
