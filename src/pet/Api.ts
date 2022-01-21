/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Pet {
  /** @format int64 */
  id: number;
  name: string;
  tag?: string;
}

export type Pets = Pet[];

export interface Error {
  /** @format int32 */
  code: number;
  message: string;
}

export namespace Pets {
  /**
   * No description
   * @tags pets
   * @name ListPets
   * @summary List all pets
   * @request GET:/pets
   * @response `200` `Pets` A paged array of pets
   * @response `default` `Error` unexpected error
   */
  export namespace ListPets {
    export type RequestParams = {};
    export type RequestQuery = { limit?: number };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Pets;
  }
  /**
   * No description
   * @tags pets
   * @name CreatePets
   * @summary Create a pet
   * @request POST:/pets
   * @response `201` `void` Null response
   * @response `default` `Error` unexpected error
   */
  export namespace CreatePets {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags pets
   * @name ShowPetById
   * @summary Info for a specific pet
   * @request GET:/pets/{petId}
   * @response `200` `Pets` Expected response to a valid request
   * @response `default` `Error` unexpected error
   */
  export namespace ShowPetById {
    export type RequestParams = { petId: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Pets;
  }
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://petstore.swagger.io/v1" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Swagger Petstore
 * @version 1.0.0
 * @license MIT
 * @baseUrl http://petstore.swagger.io/v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  pets = {
    /**
     * No description
     *
     * @tags pets
     * @name ListPets
     * @summary List all pets
     * @request GET:/pets
     * @response `200` `Pets` A paged array of pets
     * @response `default` `Error` unexpected error
     */
    listPets: (query?: { limit?: number }, params: RequestParams = {}) =>
      this.request<Pets, Error>({
        path: `/pets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pets
     * @name CreatePets
     * @summary Create a pet
     * @request POST:/pets
     * @response `201` `void` Null response
     * @response `default` `Error` unexpected error
     */
    createPets: (params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/pets`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pets
     * @name ShowPetById
     * @summary Info for a specific pet
     * @request GET:/pets/{petId}
     * @response `200` `Pets` Expected response to a valid request
     * @response `default` `Error` unexpected error
     */
    showPetById: (petId: string, params: RequestParams = {}) =>
      this.request<Pets, Error>({
        path: `/pets/${petId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
