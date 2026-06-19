import { query } from "../config/db.js";

export class BaseRepository {
  public async fetchAll(tableName: string, limit: number) {
    const tableNameFormatted = tableName.toLocaleLowerCase();
    const sql = `
      select * from $1 limit $2
      `;

    const res = await query(sql, [tableNameFormatted, limit]);

    return res;
  }
}
