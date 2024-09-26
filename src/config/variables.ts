export default () => ({

  database: {
    port: Number(process.env.POSTGRES_PORT),
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    host: String(process.env.POSTGRES_HOST),
    name: String(process.env.DATABASE)
  }
})