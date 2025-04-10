import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { Platform } from "react-native";

interface ApiError {
  message: string;
  status?: number;
  code?: string;
  timestamp?: string;
}

interface HttpClientConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
  retry?: boolean;
}

class HttpClient {
  private instance: AxiosInstance;
  private static _instance: HttpClient;

  private constructor() {
    this.instance = axios.create({
      baseURL: "https://ergast.com/api/f1",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
        "X-Platform": Platform.OS,
        "X-App-Version": "1.0.0",
      } as unknown as AxiosRequestHeaders,
    });

    this.initializeInterceptors();
  }

  public static getInstance(): HttpClient {
    if (!HttpClient._instance) {
      HttpClient._instance = new HttpClient();
    }
    return HttpClient._instance;
  }

  private initializeInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const modifiedConfig = config as HttpClientConfig;

        this.logRequest(modifiedConfig);
        return modifiedConfig;
      },
      (error: AxiosError) => {
        this.logError(error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.logResponse(response);
        return response;
      },
      (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as HttpClientConfig;

        if (error.response?.status === 401 && !originalRequest.skipAuth) {
          console.warn("Unauthorized access - please login again");
        }

        this.logError(error);
        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private logRequest(config: HttpClientConfig): void {
    if (__DEV__) {
      console.log(
        `%c${config.method?.toUpperCase()} ${config.url}`,
        "color: #4CAF50; font-weight: bold",
        config
      );
    }
  }

  private logResponse(response: AxiosResponse): void {
    if (__DEV__) {
      console.log(
        `%cRESPONSE ${response.status} ${response.config.url}`,
        "color: #2196F3; font-weight: bold",
        response.data
      );
    }
  }

  private logError(error: AxiosError): void {
    if (__DEV__) {
      console.error(
        `%cERROR ${error.response?.status || "NO_STATUS"} ${
          error.config?.url || "NO_URL"
        }`,
        "color: #F44336; font-weight: bold",
        error.response?.data || error.message
      );
    }
  }

  private normalizeError(error: AxiosError<ApiError>): ApiError {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      code: error.code,
      timestamp: new Date().toISOString(),
    };
  }

  public async get<T>(url: string, config?: HttpClientConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: HttpClientConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }
}

export const httpClient = HttpClient.getInstance();
