import { DBConnector } from "../DBConnector";
import { BaseEntity } from "./BaseEntity";


/**
 * Сущность пользователя в базе данных
 */
export class UserEntity extends BaseEntity{

    public id:number = 0;
    public login:string = '';
    public password:string = '';
	public u_access: number = 99999;
	public user_data:Object = {};
	public active:Boolean = false;
	public activation_code:string = '';
	public remember_code:string = '';
	public email:string = '';
	public email_active:Boolean = false;
	public email_code:string = '';

	constructor(db_conn:DBConnector, udt?:any){
		super(db_conn);

		if(udt!==undefined && udt!==null){
			this.id = udt.id;
			this.login = udt.login;
			this.password = udt.password;
			this.u_access = udt.u_access;
			this.user_data = udt.user_data;
			this.active = udt.active;
			this.activation_code = udt.activation_code;
			this.remember_code = udt.remember_code;
			this.email = udt.email;
			this.email_active = udt.email_active;
			this.email_code = udt.email_code;
		}
	}

}
