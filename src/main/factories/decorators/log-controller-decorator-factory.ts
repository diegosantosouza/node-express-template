import { WinstonLoggerAdapter } from "@/infrastructure/log/winston-adapter"
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator"
import { Controller } from "@/presentation/protocols/controller"

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logService = new WinstonLoggerAdapter()
  return new LogControllerDecorator(controller, logService)
}
