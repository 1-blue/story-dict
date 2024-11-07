import { Module } from "@nestjs/common";

import { PingController } from "#be/apis/v0/ping/pings.controller";

@Module({
  controllers: [PingController],
})
export class PingModule {}
