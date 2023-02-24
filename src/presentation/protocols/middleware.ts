import { HttpResponse } from "@/presentation/protocols/http"

export interface Middleware<T = unknown> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}
