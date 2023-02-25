import HealthCheckController from "@/presentation/controllers/healthcheck/healthcheck.controller"
import { Controller } from "@/presentation/protocols/controller"

export const makeHealthCheckController = (): Controller => {
  return new HealthCheckController()
}
