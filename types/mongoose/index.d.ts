/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'mongoose' {
  interface CustomLabels {
    totalDocs?: string;
    limit?: string;
    page?: string;
    totalPages?: string;
    docs?: string;
    nextPage?: string;
    prevPage?: string;
  }

  interface ReadOptions {
    pref: string;
    tags?: any[];
  }

  interface PaginateOptions {
    /* tslint:disable-next-line: ban-types */
    select?: Record<string, any> | string;
    /* tslint:disable-next-line: ban-types */
    sort?: Record<string, any> | string;
    customLabels?: CustomLabels;
    collation?: any;
    /* tslint:disable-next-line: ban-types */
    populate?: Record<string, any>[] | string[] | Record<string, any>
      | string | QueryPopulateOptions;
    lean?: boolean;
    leanWithId?: boolean;
    offset?: number;
    page?: number;
    limit?: number;
    read?: ReadOptions;
    // If pagination is set to `false`, it will return all docs without adding
    // limit condition. (Default: `true`)
    pagination?: boolean;
  }

  interface QueryPopulateOptions {
    /** space delimited path(s) to populate */
    path: string;
    /** optional fields to select */
    select?: any;
    /** optional query conditions to match */
    match?: any;
    /** optional model to use for population */
    model?: string | Model<any>;
    /** optional query options like sort, limit, etc */
    options?: any;
    /** deep populate */
    populate?: QueryPopulateOptions | QueryPopulateOptions[];
  }

  interface PaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page?: number;
    totalPages: number;
    nextPage?: number | null;
    prevPage?: number | null;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    meta?: any;
    [customLabel: string]: T[] | number | boolean | null | undefined;
  }

  interface PaginateModel<T extends Document> extends Model<T> {
    paginate(
      query?: any,
      options?: PaginateOptions,
      callback?: (err: any, result: PaginateResult<T>) => void,
    ): Promise<PaginateResult<T>>;
  }

  function model(
    name: string,
    schema?: Schema,
    collection?: string,
    skipInit?: boolean,
  ): PaginateModel<any>
}

import mongoose = require('mongoose')
declare function _(schema: mongoose.Schema): void
export = _
declare namespace _ {
  const paginate: { options: mongoose.PaginateOptions }
}
