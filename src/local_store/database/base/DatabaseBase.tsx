import SQLite, {SQLError, SQLiteDatabase} from 'react-native-sqlite-storage';
import {BaseModel} from 'react-native-sqlite-orm';
export default class DatabaseBase extends BaseModel {
  constructor(obj: any) {
    super(obj);
  }
  /**
   * @override function database
   */
  static async database(): Promise<SQLiteDatabase> {
    return await SQLite.openDatabase(
      {name: 'database.db'},
      () => {},
      (error: SQLError) => {
        console.log('### database exception', error);
      },
    );
  }
}
