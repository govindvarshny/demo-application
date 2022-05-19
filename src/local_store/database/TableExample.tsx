import {types} from 'react-native-sqlite-orm';
import DatabaseBase from './base/DatabaseBase';

export default class TableExample extends DatabaseBase {
  /**
   * @override function tableName
   */
  static get tableName() {
    return 'example';
  }
  /**
   * @override function columnMapping
   * @type types
   * @ConstraintBasic primary_key, unique, not_null, default
   */
  static get columnMapping() {
    return {
      // For while only supports id as primary key
      id: {type: types.INTEGER, primary_key: true},
      //headerNo: {type: types.TEXT, unique: true},
      userID: {type: types.TEXT, not_null: true},
      title: {type: types.TEXT, not_null: true},
      //timestamp: {type: types.INTEGER, default: () => Date.now()},
    };
  }
}
TableExample.createTable(); //Create a new table if it doesn't exist
