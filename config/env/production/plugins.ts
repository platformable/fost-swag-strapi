import type { Core } from "@strapi/strapi"

export default ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  return {
    // ...

    email: {
      config: {
        provider: "nodemailer",
        providerOptions: {
          host: env("SMTP_HOST", "smtp.gmail.com"),
          port: env.int("SMTP_PORT", 465),

          secure: env.int("SMTP_PORT", 465) === 465,
          // Force IPv4: nodemailer 10 tries IPv6 first, and Gmail rejects
          // logins (535) from this server's IPv6 address
          localAddress: "0.0.0.0",
          auth: {
            user: env("SMTP_USERNAME"),

            pass: env("SMTP_PASSWORD") || "",
          },
        },
        settings: {
          defaultFrom: "mark@platformable.com",
          defaultReplyTo: "mark@platformable.com",
        },
      },
    },
    // ...
  }
}
