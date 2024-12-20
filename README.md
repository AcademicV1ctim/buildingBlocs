# buildingBlocs
group_17
## Getting Started

1. Procure 2 Postgres Database (e.g. from Neon DB), one would be used for development and the other for test environment
2. Create a `.env` file with the following content:

   ```
   DATABASE_URL=postgresql://neondb_owner:TkaoBYFhAs23@ep-square-forest-a5cr0ht2.us-east-2.aws.neon.tech/neondb?sslmode=require
   PORT=3000
   ```

   2.1 `DATABASE_URL`: Paste the connection string for development and test environment into the `.env` file.

3. Install dependencies: `npm install`
4. Setup database: `npm run migrate:reset`
5. Start server: `npm run start`
6. Run end-2-end test: `npm test`
