import { PlatformApplication, GlobalAcceptMimesMiddleware } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/typeorm";
import "@tsed/platform-express";
import "@tsed/passport";
import "@tsed/ajv";
import cookie from "cookie-parser";
import compress from "compression";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import csurf from "csurf";
import session from "express-session";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    "/v1": "${rootDir}/controllers/**/*.ts",
  },
  componentsScan: [
    `${rootDir}/services/*.ts`,
    `${rootDir}/repositories/*.ts`,
    `${rootDir}/protocols/*.ts`,
  ],
  typeorm: [
    {
      name: "default",
      type: "postgres",
      synchronize: true,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [`${rootDir}/entities/**/*.ts`],
      migrations: [`${rootDir}/migrations/**/*.ts`],
      subscribers: [`${rootDir}/subscribers/**/*.ts`],
      logger: "advanced-console",
      logging: true,
    },
  ],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  public $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(GlobalAcceptMimesMiddleware)
      .use(cookie())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      )
      .use(
        session({
          secret:
            process.env.SESSION_SECRET ||
            Math.random().toString(36).substr(2, 9),
          resave: true,
          saveUninitialized: true,
          cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: undefined,
          },
        })
      );
    if (process.env.NODE_ENV === "production") {
      /**
       * Use a CSRF protection in production
       */
      this.app.use(csurf({ cookie: true }));
    }
  }
}
