type Raw = Record<any, any>;

export enum LogType {
    LOG = 'log',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
}
export enum TypeVariable {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    OBJECT = 'object',
    ARRAY = 'array',
    FUNCTION = 'function',
    UNDEFINED = 'undefined',
    NULL = 'null',
    SYMBOL = 'symbol',
    BIGINT = 'bigint',
    UNKNOWN = 'unknown',
}


export class LogAdapter {
    message: string;
    type: TypeVariable;

    constructor(raw: Raw) {
        this.message = raw.message;
        this.type = raw.type;
    }

    static fromRaw(raw: Raw): LogAdapter {
        return new LogAdapter(raw);
    }
}

export class LogLineAdapter {
    messages: LogAdapter[];
    type: LogType;
    timestamp: Date;

    constructor(raw: Raw) {
        this.messages = Array.isArray(raw.messages) ? raw.messages.map(LogAdapter.fromRaw) : [];
        this.type = raw.type;
        this.timestamp = raw.timestamp;
    }

    static fromRaw(raw: Raw): LogLineAdapter {
        return new LogLineAdapter(raw);
    }
}