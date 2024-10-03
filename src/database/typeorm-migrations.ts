// import { ConfigService } from "@nestjs/config";
import { config } from "dotenv"; 
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from 'path'

config()

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'finantial',
  username: 'joao',
  password: '123123',
  entities: [join(__dirname, '../modules/**/persistence/entities/*.entity.{js, ts}')],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: true,
  logging: false
}

export default new DataSource(datasourceOptions)