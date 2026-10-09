import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
export function createDatabase(filename = ':memory:') {
  const db = new DatabaseSync(filename);
  const migrations = new URL('./migrations/', import.meta.url);
  for (const file of readdirSync(migrations)
    .filter((name) => name.endsWith('.sql'))
    .sort())
    db.exec(readFileSync(new URL(file, migrations), 'utf8'));
  return {
    close: () => db.close(),
    prepare(sql) {
      let values = [];
      const statement = () => db.prepare(sql);
      const query = {
        bind(...args) {
          values = args;
          return query;
        },
        async run() {
          const result = statement().run(...values);
          return { meta: { changes: Number(result.changes) } };
        },
        async first() {
          return statement().get(...values) || null;
        },
        async all() {
          return { results: statement().all(...values) };
        },
      };
      return query;
    },
  };
}
