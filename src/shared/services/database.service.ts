import { Injectable } from "@nestjs/common";
import knex from "knex";
import { IDatabaseService } from "../../common/interfaces/IDatabaseService";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabaseService implements IDatabaseService {
    private readonly queryTimes: Map<string, {started: number; poolState: string}> = new Map<string, {started: number; poolState: string}>();

    private _knexConnection: any;

    constructor (private readonly configurationService: ConfigService){}

    getServiceName(): string {
        return DatabaseService.name;
    }

    async getConnection(): Promise<any> {
        if (!this._knexConnection) {
            this._knexConnection = knex({
                client: this.configurationService.get('client'),
                connection: `postgresql://${this.configurationService.get('connection.user')}:${this.configurationService.get('connection.password')}@${this.configurationService.get('connection.host')}/${this.configurationService.get('connection.database')}?timezone=utc&application_name=blog`,
                pool: {
                    min: this.configurationService.get('pool.min'),
                    max: this.configurationService.get('pool.max'),
                    idleTimeoutMillis: this.configurationService.get('pool.idleTimeoutMillis'),
                    acquireTimeoutMillis: this.configurationService.get('pool.acquireTimeoutMillis'),
                    propagateCreateError: false
                } as any,
                acquireConnectionTimeout: this.configurationService.get('acquireConnectionTimeout'),
                migrations: {
                    tableName: this.configurationService.get('migrations.tableName'),
                    directory: this.configurationService.get('common.base.directory') + this.configurationService.get('migrations.directory'),
                    loadExtensions: ['.js']
                },
                seeds: {
                    directory: this.configurationService.get('common.base.directory') + this.configurationService.get('seeds.directory'),
                    loadExtensions: ['.js']
                },
                searchPath: this.configurationService.get('searchPath') as string[]
            });
        }
        return this._knexConnection;
    }

    async runMigration(): Promise<any> {
        return (await this.getConnection()).migrate.latest();
    }

    async runSeed(): Promise<any> {
        return (await this.getConnection()).seed.run();
    }
}