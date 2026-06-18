const isProduction = process.env.NODE_ENV === "production";

export const logger = isProduction
?{
    level: "info"
}:{
    level: "debug",
    transport:{
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
            singleLine: true
        }
    }
}