import { Controller, Get } from "@nestjs/common";

@Controller("apis/v0/ping")
export class PingController {
  constructor() {}

  @Get()
  ping() {
    return "pong";
  }
}
