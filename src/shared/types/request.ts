import { Request } from 'express';

export type RequestBody = Record<string, unknown>;

export type RequestParams = Record<string, unknown>;

export type Req<T, Params = Record<string, unknown>> = Request<Params, Record<string, unknown>, T>;
