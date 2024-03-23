// logger.service.ts

import { Injectable, Scope } from '@nestjs/common';
import * as pino from 'pino';
import { Logger } from 'pino';
import * as pretty from 'pino-pretty';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
    private readonly rootLogger: Logger;
    private readonly customLogger: Logger;

    constructor() {
        this.rootLogger = pino({
            prettyPrint: {
                colorize: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss',
                ignore: 'pid,hostname',
            },
        }, pretty());

        this.customLogger = this.rootLogger.child({
            // Add custom fields for your custom logger
            // Example: application: 'MyApp', version: '1.0',
        });
    }

    getLogger(): Logger {
        return this.rootLogger;
    }

    getCustomLogger(): Logger {
        return this.customLogger;
    }
}
