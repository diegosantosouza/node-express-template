import { Logger } from "@/data/protocols/log/log-protocol"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly log: Logger
  ) { }

  async handle(request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode >= 299) {
      this.log.error(httpResponse.body.stack)
    }
    return httpResponse
  }
}
