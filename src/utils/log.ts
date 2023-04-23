

interface ILogger {
    debug(message: string, ...args: any[]): void
    info(message: string, ...args: any[]): void
    warn(message: string, ...args: any[]): void
    error(message: string, ...args: any[]): void
}

export type LogLevel = 'debug' | 'log' | 'info' | 'warn' | 'error'
export type LogLevels = {
    [key in LogLevel]: number
}
export type loggerOptions = {
    prefix?: string;
    level?: LogLevel;
    stringify?: boolean;
}
class Logger implements ILogger {
    prefix: string
    level: string
    stringify: boolean;

    levels: LogLevels = {
        debug: 0,
        log: 1,
        info: 2,
        warn: 3,
        error: 4,
    }

    constructor(ops: loggerOptions) {
        const { level = "debug", prefix = "", stringify = false } = ops
        this.prefix = prefix
        this.level = level
        this.stringify = stringify
    }

    private _log(level: string, ...args: any[]) {
        const colors: any = {
            debug: 'blue',
            log: 'blue',
            info: 'green',
            warn: 'orange',
            error: 'red',
        }

        const logStyles = `color: ${colors[level] || 'black'}; font-weight: bold;`
        const timeStyles = 'color: gray; font-style: italic;'

        let logArgs = args.map((arg) => {
            if (typeof arg === 'object' && arg !== null && this.stringify) {
                try {
                    return prettyJson(arg)
                } catch (e) {
                    return arg
                }
            } else if (
                typeof arg === 'string' &&
                arg.startsWith('[') &&
                arg.endsWith(']')
            ) {
                const innerText: any = arg.slice(1, -1)
                return `[${innerText.toUpperCase()}]`
            }

            return arg
        })

        console.log(
            `%c[${new Date().toISOString()}]%c [%c${level.toUpperCase()}%c] %c[${this.prefix.toUpperCase()}]`,
            timeStyles,
            '',
            logStyles,
            '',
            '',
            ...logArgs,
        )
    }

    private shouldLog(level: LogLevel) {
        return this.levels[level] >= this.levels[this.level as LogLevel]
    }

    debug(...args: any[]) {
        if (!this.shouldLog('debug' as LogLevel)) return
        this._log('debug', ...args)
    }

    log(...args: any[]) {
        if (!this.shouldLog('log' as LogLevel)) return
        this._log('log', ...args)
    }

    info(...args: any[]) {
        if (!this.shouldLog('info' as LogLevel)) return
        this._log('info', ...args)
    }

    warn(...args: any[]) {
        if (!this.shouldLog('warn' as LogLevel)) return
        this._log('warn', ...args)
    }

    error(...args: any[]) {
        this._log('error', ...args)
    }
}

export const logger = new Logger({
    prefix: "mod-app"
})
