import {SQLiteDatabase} from 'react-native-sqlite-storage';
declare module 'react-native-sqlite-orm' {
  export class BaseModel {
    static repository: any;
    /**
     * @description Constructor.
     * @param any (any is fields of table)
     */
    constructor(obj: any);
    /**
     * @description Create and connect to database.
     * @returns SQLiteDatabase
     */
    static async database(): Promise<SQLiteDatabase>;
    /**
     * @description Get table name.
     * @returns string
     */
    static get tableName(): string;
    /**
     * @description Define columns of table.
     * @returns any
     */
    static get columnMapping(): any;
    /**
     * @description Create a new table if it doesn't exist.
     * @returns true (if successfully then alway return true)
     * @throws if fail then will exception
     */
    static async createTable(): Promise<boolean>;
    /**
     * @description Delete table.
     * @returns true (if successfully then alway return true)
     * @throws if fail then will exception
     */
    static async dropTable(): Promise<boolean>;
    /**
     * @description Insert one record.
     * @param any (any is fields of table)
     * @returns any (any is fields of table)
     * @throws if fail then will exception
     */
    static async create(obj: any): Promise<any>;
    /**
     * @description Update one record.
     * @param any (any is fields of table)
     * @returns any (any is fields of table)
     * @throws if fail then will exception
     */
    static async update(obj: any): Promise<any>;
    /**
     * @description Insert one record
     * @returns any (any is fields of table)
     * @throws if fail then will exception
     */
    async save(): Promise<any>;
    /**
     * @description Delete record with id.
     * @param id: number | string
     * @returns true (if successfully then alway return true)
     * @throws if fail then will exception
     */
    static async destroy(id: number | string): Promise<boolean>;
    /**
     * @description Delete all records in table.
     * @returns true (if successfully then alway return true)
     * @throws if fail then will exception
     */
    static async destroyAll(): Promise<boolean>;
    /**
     * @description Find one record with id
     * @param id: number | string
     * @returns any | null (any is fields of table)
     * @throws if fail then will exception
     */
    static async find(id: number | string): Promise<any | null>;
    /**
     * @description Find one record with where.
     * @param any 
      example where = { 
        age_eq: 12345, 
        color_cont: '%Brown%' 
      }
     * @where_field_suffix
     * eq is = , neq is <> , lt is < , lteq is <= ,
     * gt is > , gteq is >= , cont is LIKE 
     * @returns any | null (any is fields of table)
     * @throws if fail then will exception
     */
    static async findBy(where: any): Promise<any | null>;
    /**
     * @description Query records with options.
     * @param any
     * @limit if page != null then default limit is 30
     * @example
     options = {
          columns: 'id, name',
          where: {
            age_gt: 2
          },
          page: 2,
          limit: 30,
          order: 'name ASC'
      }
     * @where_field_suffix
     * eq is = , neq is <> , lt is < , lteq is <= ,
     * gt is > , gteq is >= , cont is LIKE 
     * @returns any[] (alway return array, any is fields of table)
     * @throws if fail then will exception
     */
    static async query(options: any): Promise<any[]>;
  }

  /**
   * @description Data types of Sqlite
   */
  export const types = {
    INTEGER: 'INTEGER',
    FLOAT: 'FLOAT',
    TEXT: 'TEXT',
    NUMERIC: 'NUMERIC',
    DATE: 'DATE',
    DATETIME: 'DATETIME',
    BOOLEAN: 'BOOLEAN',
    JSON: 'JSON',
  };
  /**
   * @description Constraint basic
   */
  // export const constraint = {
  //   AUTO_ID: 'primary_key',
  //   UNIQUE: 'unique',
  //   NOT_NULL: 'not_null',
  //   DEFAULT: 'default', // default value
  // };
}
