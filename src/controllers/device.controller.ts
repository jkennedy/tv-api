import { Controller, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { DeviceService } from '../services/device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

}
