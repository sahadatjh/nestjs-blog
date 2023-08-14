export interface IDatabaseService {
    getServiceName();
    getConnection();
    runMigration();
    runSeed();
}
