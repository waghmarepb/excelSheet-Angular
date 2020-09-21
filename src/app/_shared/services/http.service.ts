import { UtilsService } from "./utils.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  baseUrl: string = environment.baseUrl;
  headers: HttpHeaders;

  idToken = "";
  private headerOptions: any = {
    "Content-Type": "application/json",
    "x-access-token": "",
  };

  constructor(
    private http: HttpClient,
    private utilService: UtilsService,
    private router: Router
  ) {
    this.baseUrl = environment.baseUrl;
    const idToken = this.utilService.localStorageGet("token") || null;
    this.updateAuthHeader(idToken);
  }

  /**
   * for using get method.
   * @param url : url where request
   * @param params
   */
  get(url: string, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.get(apiUrl, {
      headers: this.headers,
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  put(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.put(apiUrl, data, {
      headers: this.headers,
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  post(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    console.log("apiUrl", apiUrl);
    return this.http.post(apiUrl, data, {
      headers: this.headers,
    });
  }

  filePost(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    let fileHeaders: HttpHeaders = this.headers;
    fileHeaders = fileHeaders.delete("Content-type");
    return this.http.post(apiUrl, data, {
      headers: fileHeaders,
    });
  }

  /**
   * delete method does not have any body part
   * passes object id as parameter
   * also passes token in header part
   * @param url : url where request will be send
   */
  delete(url: string) {
    const apiUrl = `${this.baseUrl}${url}`;
    return this.http.delete(apiUrl, {
      headers: this.headers,
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  simplePost(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data);
  }

  /**
   * for using get method.
   * @param url : url where request
   * @param params
   */
  simpleGet(url: string, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.get(apiUrl);
  }

  /**
   * Helper Method that will generate the queryString.
   * @param params Object to be converted into URLSearchParam.
   */
  generateQueryString(params?: object): string {
    let queryString = "",
      httpParam = new URLSearchParams();
    Object.keys(params || {}).forEach((key) => httpParam.set(key, params[key]));
    queryString = httpParam.toString() ? `?${httpParam.toString()}` : "";
    return queryString;
  }

  /**
   * Helper method to Update the headers.
   * @param idToken secret token come after login.
   */
  updateAuthHeader(idToken: string) {
    this.idToken = idToken;
    this.headerOptions["x-access-token"] = idToken ? `${idToken}` : null;
    this.headers = new HttpHeaders(this.headerOptions);
  }
}
