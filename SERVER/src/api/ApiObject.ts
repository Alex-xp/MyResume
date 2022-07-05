import express, { Express, Request, Response } from 'express';
import { ApiResult } from './ApiResult';
import { DBConnector } from '../db/DBConnector';


/**
 * Объект запроса для API.
 * Избавляемся от большого списка импортов в определениях команд
 */
export class ApiObject{
    public req:Request;
    public res:Response;
    public cmd:string;
    public args:any;
    public result:ApiResult
    public db_conn:DBConnector
}

