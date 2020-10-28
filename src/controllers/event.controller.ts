import { Controller, Query, Get, UseGuards, Request } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { Auth } from '../decorators/auth.decorator';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get('today')
  @Auth('access-token')
  async getTodaysEvents( @Request() req ) {
    return this.eventService.getTodaysEvents(req.user);
  }
}
