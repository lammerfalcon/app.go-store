import {ofetch} from "ofetch";

export function useApi<T>(url: string, options: any = {}) {

  return ofetch<T>(url, options);
}
