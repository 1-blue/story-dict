import { Controller } from "@nestjs/common";

import { TrpcService } from "#be/apis/v0/trpc/trpc.service";

@Controller("/api/v0/trpc")
export class TrpcController {
  constructor(private readonly trpcService: TrpcService) {}
}
