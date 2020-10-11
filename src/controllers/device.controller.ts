import { Controller, Get, Post, Header, HttpCode, HttpStatus, Res, Param, Query, Body, Render} from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { DeviceRegistrationDto } from '../dtos/deviceRegistration.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post('initializeDeviceForRegistration')
  initializeDeviceForRegistration(@Body() registration: DeviceRegistrationDto) {
    console.log('make device avail for registration');
    return this.deviceService.initializeDeviceForRegistration(registration);
  }

  @Get('pollDeviceForRegistrationCompletion')
  async pollDeviceForRegistrationCompletion(@Query() params) {
    console.log('pollDeviceForRegistrationCompletion');
    let deviceId = params.deviceId;
    let registrationCode = params.registrationCode;
    let response = await this.deviceService.pollDeviceForRegistrationCompletion (deviceId, registrationCode);
    return response;
  }
}
