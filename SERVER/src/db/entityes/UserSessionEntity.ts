import { DBConnector } from "../DBConnector";
import { BaseEntity } from "./BaseEntity";

/**
 * Сущность записи сессии
 */
export class UserSessionEntity extends BaseEntity{

    public id:number = 0;
    public uid:number = 0;
	public key_uid:string = "";
	public sess_key:string = "";
	public started:Date = new Date( Date.now() );
    public expires:Date= new Date( Date.now() );
	public sess_data:Object = {};


	constructor(db_conn:DBConnector, ss?:any){
		super(db_conn);

		if(ss!==undefined && ss!==null){
			this.id = ss.id;
			this.uid = ss.uid;
			this.key_uid = ss.key_uid;
			this.sess_key = ss.sess_key;
			this.started = ss.started;
			this.expires = ss.expires;
			this.sess_data = ss.sess_data;
		}
	}

	public async updateExpires(expires: Date){
		await this.db_conn.Exec({
			text: "UPDATE users_sessions SET expires=$1 WHERE id=$2",
			values: [expires, this.id]
		});
	}

}
