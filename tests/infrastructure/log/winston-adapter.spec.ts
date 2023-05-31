import { WinstonLoggerAdapter } from "@/infrastructure/log/winston-adapter";

const makeSut = (): WinstonLoggerAdapter => {
  return new WinstonLoggerAdapter()
}

describe('WinstonLoggerAdapter', () => {
  test('info should log message and meta', () => {
    const message = 'Info message'
    const meta = { key: 'value' }
    const sut = makeSut()
    const infoSpy = jest.spyOn(sut, 'info')
    sut.info(message, meta)
    expect(infoSpy).toHaveBeenCalledWith(message, meta)
  })

  test('debug should log message and meta', () => {
    const message = 'Debug message'
    const meta = { key: 'value' }
    const sut = makeSut()
    const debugSpy = jest.spyOn(sut, 'debug')
    sut.debug(message, meta)
    expect(debugSpy).toHaveBeenCalledWith(message, meta)
  })

  test('warn should log message and meta', () => {
    const message = 'Warning message'
    const meta = { key: 'value' }
    const sut = makeSut()
    const warnSpy = jest.spyOn(sut, 'warn')
    sut.warn(message, meta)
    expect(warnSpy).toHaveBeenCalledWith(message, meta)
  })

  test('error should log message and meta', () => {
    const message = 'Error message'
    const meta = { key: 'value' }
    const sut = makeSut()
    const errorSpy = jest.spyOn(sut, 'error')
    sut.error(message, meta)
    expect(errorSpy).toHaveBeenCalledWith(message, meta)
  })
});
