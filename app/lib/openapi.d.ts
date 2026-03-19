import type { BlocksContent } from "@strapi/blocks-react-renderer";

export interface paths {
  "/categories": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["category/get/categories"];
    put?: never;
    post: operations["category/post/categories"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/categories/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["category/get/categories_by_id"];
    put: operations["category/put/categories_by_id"];
    post?: never;
    delete: operations["category/delete/categories_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/cities": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["city/get/cities"];
    put?: never;
    post: operations["city/post/cities"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/cities/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["city/get/cities_by_id"];
    put: operations["city/put/cities_by_id"];
    post?: never;
    delete: operations["city/delete/cities_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/events": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["event/get/events"];
    put?: never;
    post: operations["event/post/events"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/events/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["event/get/events_by_id"];
    put: operations["event/put/events_by_id"];
    post?: never;
    delete: operations["event/delete/events_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/content-types": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["content-type-builder/get/content_types"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/content-types/{uid}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["content-type-builder/get/content_types_by_uid"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/components": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["content-type-builder/get/components"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/components/{uid}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["content-type-builder/get/components_by_uid"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["upload/post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/files": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["upload/get/files"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/files/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["upload/get/files_by_id"];
    put?: never;
    post?: never;
    delete: operations["upload/delete/files_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/locales": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["i18n/get/locales"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/connect/(.*)": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/connect_____"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/local": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users-permissions/post/auth_local"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/local/register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users-permissions/post/auth_local_register"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/{provider}/callback": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/auth_by_provider_callback"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/forgot-password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users-permissions/post/auth_forgot_password"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/reset-password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users-permissions/post/auth_reset_password"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/email-confirmation": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/auth_email_confirmation"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/send-email-confirmation": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users-permissions/post/auth_send_email_confirmation"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/change-password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users-permissions/post/auth_change_password"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/refresh": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users-permissions/post/auth_refresh"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users-permissions/post/auth_logout"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/count": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/users_count"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/users"];
    put?: never;
    post: operations["users-permissions/post/users"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/users_me"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/users_by_id"];
    put: operations["users-permissions/put/users_by_id"];
    post?: never;
    delete: operations["users-permissions/delete/users_by_id"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/roles/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/roles_by_id"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/roles": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/roles"];
    put?: never;
    post: operations["users-permissions/post/roles"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/roles/{role}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations["users-permissions/put/roles_by_role"];
    post?: never;
    delete: operations["users-permissions/delete/roles_by_role"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/permissions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users-permissions/get/permissions"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  "category/get/categories": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        filters?: {
          [key: string]: unknown;
        };
        _q?: string;
        pagination?: {
          withCount?: boolean;
        } & (
          | {
              page: number;
              pageSize: number;
            }
          | {
              start: number;
              limit: number;
            }
        );
        sort?:
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")[]
          | {
              [key: string]: "asc" | "desc";
            }
          | {
              [key: string]: "asc" | "desc";
            }[];
        populate?: "*" | "events" | "events"[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name?: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              events?: {
                documentId: string;
                id: string | number;
                title: string;
                description: BlocksContent;
                startDate: string;
                endDate?: string;
                startTime?: string;
                endTime?: string;
                url?: string;
                address?: string;
                email?: string;
                phone?: string;
                privacyLevel: number;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                city?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                };
                picture?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                };
                extraPictures?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                }[];
                categories?: {
                  documentId: string;
                  id: string | number;
                  name?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  events?: unknown[];
                }[];
              }[];
            }[];
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "category/post/categories": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        populate?: "*" | "events" | "events"[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          data: {
            name?: string;
            publishedAt: string;
            events?: string[];
          };
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name?: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              events?: {
                documentId: string;
                id: string | number;
                title: string;
                description: BlocksContent;
                startDate: string;
                endDate?: string;
                startTime?: string;
                endTime?: string;
                url?: string;
                address?: string;
                email?: string;
                phone?: string;
                privacyLevel: number;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                city?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                };
                picture?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                };
                extraPictures?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                }[];
                categories?: {
                  documentId: string;
                  id: string | number;
                  name?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  events?: unknown[];
                }[];
              }[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "category/get/categories_by_id": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        populate?: "*" | "events" | "events"[];
        filters?: {
          [key: string]: unknown;
        };
        sort?:
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")[]
          | {
              [key: string]: "asc" | "desc";
            }
          | {
              [key: string]: "asc" | "desc";
            }[];
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name?: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              events?: {
                documentId: string;
                id: string | number;
                title: string;
                description: BlocksContent;
                startDate: string;
                endDate?: string;
                startTime?: string;
                endTime?: string;
                url?: string;
                address?: string;
                email?: string;
                phone?: string;
                privacyLevel: number;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                city?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                };
                picture?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                };
                extraPictures?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                }[];
                categories?: {
                  documentId: string;
                  id: string | number;
                  name?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  events?: unknown[];
                }[];
              }[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "category/put/categories_by_id": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        populate?: "*" | "events" | "events"[];
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          data: {
            name?: string;
            publishedAt?: string;
            events?: string[];
          };
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name?: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              events?: {
                documentId: string;
                id: string | number;
                title: string;
                description: BlocksContent;
                startDate: string;
                endDate?: string;
                startTime?: string;
                endTime?: string;
                url?: string;
                address?: string;
                email?: string;
                phone?: string;
                privacyLevel: number;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                city?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                };
                picture?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                };
                extraPictures?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                }[];
                categories?: {
                  documentId: string;
                  id: string | number;
                  name?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  events?: unknown[];
                }[];
              }[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "category/delete/categories_by_id": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        populate?: "*" | "events" | "events"[];
        filters?: {
          [key: string]: unknown;
        };
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name?: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              events?: {
                documentId: string;
                id: string | number;
                title: string;
                description: BlocksContent;
                startDate: string;
                endDate?: string;
                startTime?: string;
                endTime?: string;
                url?: string;
                address?: string;
                email?: string;
                phone?: string;
                privacyLevel: number;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                city?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                };
                picture?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                };
                extraPictures?: {
                  documentId: string;
                  id: string | number;
                  name: string;
                  alternativeText?: string;
                  caption?: string;
                  focalPoint?: unknown;
                  width?: number;
                  height?: number;
                  formats?: unknown;
                  hash: string;
                  ext?: string;
                  mime: string;
                  size: number;
                  url: string;
                  previewUrl?: string;
                  provider: string;
                  provider_metadata?: unknown;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  related: unknown;
                }[];
                categories?: {
                  documentId: string;
                  id: string | number;
                  name?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt: string;
                  events?: unknown[];
                }[];
              }[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "city/get/cities": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        filters?: {
          [key: string]: unknown;
        };
        _q?: string;
        pagination?: {
          withCount?: boolean;
        } & (
          | {
              page: number;
              pageSize: number;
            }
          | {
              start: number;
              limit: number;
            }
        );
        sort?:
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")[]
          | {
              [key: string]: "asc" | "desc";
            }
          | {
              [key: string]: "asc" | "desc";
            }[];
        populate?: "*" | never | never[];
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
            }[];
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "city/post/cities": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        populate?: "*" | never | never[];
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          data: {
            name: string;
            publishedAt: string;
          };
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "city/get/cities_by_id": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        populate?: "*" | never | never[];
        filters?: {
          [key: string]: unknown;
        };
        sort?:
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")[]
          | {
              [key: string]: "asc" | "desc";
            }
          | {
              [key: string]: "asc" | "desc";
            }[];
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "city/put/cities_by_id": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        populate?: "*" | never | never[];
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          data: {
            name?: string;
            publishedAt?: string;
          };
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "city/delete/cities_by_id": {
    parameters: {
      query?: {
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        populate?: "*" | never | never[];
        filters?: {
          [key: string]: unknown;
        };
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              name: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "event/get/events": {
    parameters: {
      query?: {
        fields?: (
          | "title"
          | "description"
          | "startDate"
          | "endDate"
          | "startTime"
          | "endTime"
          | "url"
          | "address"
          | "email"
          | "phone"
          | "privacyLevel"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        filters?: {
          [key: string]: unknown;
        };
        _q?: string;
        pagination?: {
          withCount?: boolean;
        } & (
          | {
              page: number;
              pageSize: number;
            }
          | {
              start: number;
              limit: number;
            }
        );
        sort?:
          | (
              | "title"
              | "description"
              | "startDate"
              | "endDate"
              | "startTime"
              | "endTime"
              | "url"
              | "address"
              | "email"
              | "phone"
              | "privacyLevel"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )
          | (
              | "title"
              | "description"
              | "startDate"
              | "endDate"
              | "startTime"
              | "endTime"
              | "url"
              | "address"
              | "email"
              | "phone"
              | "privacyLevel"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )[]
          | {
              [key: string]: "asc" | "desc";
            }
          | {
              [key: string]: "asc" | "desc";
            }[];
        populate?:
          | "*"
          | ("city" | "picture" | "extraPictures" | "categories")
          | ("city" | "picture" | "extraPictures" | "categories")[];
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              title: string;
              description: BlocksContent;
              startDate: string;
              endDate?: string;
              startTime?: string;
              endTime?: string;
              url?: string;
              address?: string;
              email?: string;
              phone?: string;
              privacyLevel: number;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              city?: {
                documentId: string;
                id: string | number;
                name: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
              };
              picture?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              };
              extraPictures?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              }[];
              categories?: {
                documentId: string;
                id: string | number;
                name?: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                events?: unknown[];
              }[];
            }[];
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "event/post/events": {
    parameters: {
      query?: {
        fields?: (
          | "title"
          | "description"
          | "startDate"
          | "endDate"
          | "startTime"
          | "endTime"
          | "url"
          | "address"
          | "email"
          | "phone"
          | "privacyLevel"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        populate?:
          | "*"
          | ("city" | "picture" | "extraPictures" | "categories")
          | ("city" | "picture" | "extraPictures" | "categories")[];
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          data: {
            title: string;
            description?: BlocksContent;
            startDate: string;
            endDate?: string;
            startTime?: string;
            endTime?: string;
            url?: string;
            address?: string;
            email?: string;
            phone?: string;
            privacyLevel: number;
            publishedAt?: string;
            city?: string;
            picture?: unknown;
            extraPictures?: unknown[];
            categories?: string[];
          };
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              title: string;
              description: BlocksContent;
              startDate: string;
              endDate?: string;
              startTime?: string;
              endTime?: string;
              url?: string;
              address?: string;
              email?: string;
              phone?: string;
              privacyLevel: number;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              city?: {
                documentId: string;
                id: string | number;
                name: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
              };
              picture?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              };
              extraPictures?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              }[];
              categories?: {
                documentId: string;
                id: string | number;
                name?: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                events?: unknown[];
              }[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "event/get/events_by_id": {
    parameters: {
      query?: {
        fields?: (
          | "title"
          | "description"
          | "startDate"
          | "endDate"
          | "startTime"
          | "endTime"
          | "url"
          | "address"
          | "email"
          | "phone"
          | "privacyLevel"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        populate?:
          | "*"
          | ("city" | "picture" | "extraPictures" | "categories")
          | ("city" | "picture" | "extraPictures" | "categories")[];
        filters?: {
          [key: string]: unknown;
        };
        sort?:
          | (
              | "title"
              | "description"
              | "startDate"
              | "endDate"
              | "startTime"
              | "endTime"
              | "url"
              | "address"
              | "email"
              | "phone"
              | "privacyLevel"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )
          | (
              | "title"
              | "description"
              | "startDate"
              | "endDate"
              | "startTime"
              | "endTime"
              | "url"
              | "address"
              | "email"
              | "phone"
              | "privacyLevel"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )[]
          | {
              [key: string]: "asc" | "desc";
            }
          | {
              [key: string]: "asc" | "desc";
            }[];
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              title: string;
              description: BlocksContent;
              startDate: string;
              endDate?: string;
              startTime?: string;
              endTime?: string;
              url?: string;
              address?: string;
              email?: string;
              phone?: string;
              privacyLevel: number;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              city?: {
                documentId: string;
                id: string | number;
                name: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
              };
              picture?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              };
              extraPictures?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              }[];
              categories?: {
                documentId: string;
                id: string | number;
                name?: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                events?: unknown[];
              }[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "event/put/events_by_id": {
    parameters: {
      query?: {
        fields?: (
          | "title"
          | "description"
          | "startDate"
          | "endDate"
          | "startTime"
          | "endTime"
          | "url"
          | "address"
          | "email"
          | "phone"
          | "privacyLevel"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        populate?:
          | "*"
          | ("city" | "picture" | "extraPictures" | "categories")
          | ("city" | "picture" | "extraPictures" | "categories")[];
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          data: {
            title?: string;
            description?: unknown[];
            startDate?: string;
            endDate?: string;
            startTime?: string;
            endTime?: string;
            url?: string;
            address?: string;
            email?: string;
            phone?: string;
            privacyLevel?: number;
            publishedAt?: string;
            city?: string;
            picture?: unknown;
            extraPictures?: unknown[];
            categories?: string[];
          };
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              title: string;
              description: BlocksContent;
              startDate: string;
              endDate?: string;
              startTime?: string;
              endTime?: string;
              url?: string;
              address?: string;
              email?: string;
              phone?: string;
              privacyLevel: number;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              city?: {
                documentId: string;
                id: string | number;
                name: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
              };
              picture?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              };
              extraPictures?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              }[];
              categories?: {
                documentId: string;
                id: string | number;
                name?: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                events?: unknown[];
              }[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "event/delete/events_by_id": {
    parameters: {
      query?: {
        fields?: (
          | "title"
          | "description"
          | "startDate"
          | "endDate"
          | "startTime"
          | "endTime"
          | "url"
          | "address"
          | "email"
          | "phone"
          | "privacyLevel"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        populate?:
          | "*"
          | ("city" | "picture" | "extraPictures" | "categories")
          | ("city" | "picture" | "extraPictures" | "categories")[];
        filters?: {
          [key: string]: unknown;
        };
        status?: "draft" | "published";
        hasPublishedVersion?: boolean | ("true" | "false");
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              documentId: string;
              id: string | number;
              title: string;
              description: BlocksContent;
              startDate: string;
              endDate?: string;
              startTime?: string;
              endTime?: string;
              url?: string;
              address?: string;
              email?: string;
              phone?: string;
              privacyLevel: number;
              createdAt?: string;
              updatedAt?: string;
              publishedAt: string;
              city?: {
                documentId: string;
                id: string | number;
                name: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
              };
              picture?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              };
              extraPictures?: {
                documentId: string;
                id: string | number;
                name: string;
                alternativeText?: string;
                caption?: string;
                focalPoint?: unknown;
                width?: number;
                height?: number;
                formats?: unknown;
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string;
                provider: string;
                provider_metadata?: unknown;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                related: unknown;
              }[];
              categories?: {
                documentId: string;
                id: string | number;
                name?: string;
                createdAt?: string;
                updatedAt?: string;
                publishedAt: string;
                events?: unknown[];
              }[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "content-type-builder/get/content_types": {
    parameters: {
      query: {
        kind: "collectionType" | "singleType";
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              uid: string;
              plugin?: string;
              apiID: string;
              schema: {
                displayName: string;
                singularName: string;
                pluralName: string;
                description: string;
                draftAndPublish: boolean;
                kind: "collectionType" | "singleType";
                collectionName?: string;
                attributes: {
                  [key: string]:
                    | {
                        type: "media";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        multiple: boolean;
                        required?: boolean;
                        allowedTypes?: string[];
                      }
                    | {
                        type: "relation";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        relation: string;
                        target: string;
                        targetAttribute: string | null;
                        autoPopulate?: boolean;
                        mappedBy?: string;
                        inversedBy?: string;
                      }
                    | {
                        type: "component";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        component: string;
                        repeatable: boolean;
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        type: "dynamiczone";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        components: string[];
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        type: "uid";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        targetField?: string;
                      }
                    | {
                        type: string;
                        required?: boolean;
                        unique?: boolean;
                        default?: unknown;
                        min?: number | string;
                        max?: number | string;
                        minLength?: number;
                        maxLength?: number;
                        enum?: string[];
                        regex?: string;
                        private?: boolean;
                        configurable?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                      };
                };
                visible: boolean;
                restrictRelationsTo: string[] | null;
                pluginOptions?: {
                  [key: string]: unknown;
                };
                options?: {
                  [key: string]: unknown;
                };
                reviewWorkflows?: boolean;
                populateCreatorFields?: boolean;
                comment?: string;
                version?: string;
              };
            }[];
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "content-type-builder/get/content_types_by_uid": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        uid: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              uid: string;
              plugin?: string;
              apiID: string;
              schema: {
                displayName: string;
                singularName: string;
                pluralName: string;
                description: string;
                draftAndPublish: boolean;
                kind: "collectionType" | "singleType";
                collectionName?: string;
                attributes: {
                  [key: string]:
                    | {
                        type: "media";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        multiple: boolean;
                        required?: boolean;
                        allowedTypes?: string[];
                      }
                    | {
                        type: "relation";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        relation: string;
                        target: string;
                        targetAttribute: string | null;
                        autoPopulate?: boolean;
                        mappedBy?: string;
                        inversedBy?: string;
                      }
                    | {
                        type: "component";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        component: string;
                        repeatable: boolean;
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        type: "dynamiczone";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        components: string[];
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        type: "uid";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        targetField?: string;
                      }
                    | {
                        type: string;
                        required?: boolean;
                        unique?: boolean;
                        default?: unknown;
                        min?: number | string;
                        max?: number | string;
                        minLength?: number;
                        maxLength?: number;
                        enum?: string[];
                        regex?: string;
                        private?: boolean;
                        configurable?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                      };
                };
                visible: boolean;
                restrictRelationsTo: string[] | null;
                pluginOptions?: {
                  [key: string]: unknown;
                };
                options?: {
                  [key: string]: unknown;
                };
                reviewWorkflows?: boolean;
                populateCreatorFields?: boolean;
                comment?: string;
                version?: string;
              };
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "content-type-builder/get/components": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              uid: string;
              category: string;
              apiId: string;
              schema: {
                displayName: string;
                description: string;
                icon?: string;
                connection?: string;
                collectionName?: string;
                attributes: {
                  [key: string]:
                    | {
                        type: "media";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        multiple: boolean;
                        required?: boolean;
                        allowedTypes?: string[];
                      }
                    | {
                        type: "relation";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        relation: string;
                        target: string;
                        targetAttribute: string | null;
                        autoPopulate?: boolean;
                        mappedBy?: string;
                        inversedBy?: string;
                      }
                    | {
                        type: "component";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        component: string;
                        repeatable: boolean;
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        type: "dynamiczone";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        components: string[];
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        type: "uid";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        targetField?: string;
                      }
                    | {
                        type: string;
                        required?: boolean;
                        unique?: boolean;
                        default?: unknown;
                        min?: number | string;
                        max?: number | string;
                        minLength?: number;
                        maxLength?: number;
                        enum?: string[];
                        regex?: string;
                        private?: boolean;
                        configurable?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                      };
                };
                pluginOptions?: {
                  [key: string]: unknown;
                };
              };
            }[];
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "content-type-builder/get/components_by_uid": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        uid: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            data: {
              uid: string;
              category: string;
              apiId: string;
              schema: {
                displayName: string;
                description: string;
                icon?: string;
                connection?: string;
                collectionName?: string;
                attributes: {
                  [key: string]:
                    | {
                        type: "media";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        multiple: boolean;
                        required?: boolean;
                        allowedTypes?: string[];
                      }
                    | {
                        type: "relation";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        relation: string;
                        target: string;
                        targetAttribute: string | null;
                        autoPopulate?: boolean;
                        mappedBy?: string;
                        inversedBy?: string;
                      }
                    | {
                        type: "component";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        component: string;
                        repeatable: boolean;
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        type: "dynamiczone";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        components: string[];
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        type: "uid";
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        targetField?: string;
                      }
                    | {
                        type: string;
                        required?: boolean;
                        unique?: boolean;
                        default?: unknown;
                        min?: number | string;
                        max?: number | string;
                        minLength?: number;
                        maxLength?: number;
                        enum?: string[];
                        regex?: string;
                        private?: boolean;
                        configurable?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                      };
                };
                pluginOptions?: {
                  [key: string]: unknown;
                };
              };
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "upload/post": {
    parameters: {
      query?: {
        id?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json":
            | {
                id: number;
                documentId: string;
                name: string;
                alternativeText?: string | null;
                caption?: string | null;
                width?: number;
                height?: number;
                formats?: {
                  [key: string]: unknown;
                };
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string | null;
                folder?: number;
                folderPath: string;
                provider: string;
                provider_metadata?: {
                  [key: string]: unknown;
                } | null;
                createdAt: string;
                updatedAt: string;
                createdBy?: number;
                updatedBy?: number;
              }
            | {
                id: number;
                documentId: string;
                name: string;
                alternativeText?: string | null;
                caption?: string | null;
                width?: number;
                height?: number;
                formats?: {
                  [key: string]: unknown;
                };
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string | null;
                folder?: number;
                folderPath: string;
                provider: string;
                provider_metadata?: {
                  [key: string]: unknown;
                } | null;
                createdAt: string;
                updatedAt: string;
                createdBy?: number;
                updatedBy?: number;
              }[];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "upload/get/files": {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | "*"
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
        sort?:
          | string
          | string[]
          | {
              [key: string]: "asc" | "desc";
            }
          | {
              [key: string]: "asc" | "desc";
            }[];
        pagination?: {
          withCount?: boolean;
        } & (
          | {
              page: number;
              pageSize: number;
            }
          | {
              start: number;
              limit: number;
            }
        );
        filters?: {
          [key: string]: unknown;
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            name: string;
            alternativeText?: string | null;
            caption?: string | null;
            width?: number;
            height?: number;
            formats?: {
              [key: string]: unknown;
            };
            hash: string;
            ext?: string;
            mime: string;
            size: number;
            url: string;
            previewUrl?: string | null;
            folder?: number;
            folderPath: string;
            provider: string;
            provider_metadata?: {
              [key: string]: unknown;
            } | null;
            createdAt: string;
            updatedAt: string;
            createdBy?: number;
            updatedBy?: number;
          }[];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "upload/get/files_by_id": {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | "*"
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
      };
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            name: string;
            alternativeText?: string | null;
            caption?: string | null;
            width?: number;
            height?: number;
            formats?: {
              [key: string]: unknown;
            };
            hash: string;
            ext?: string;
            mime: string;
            size: number;
            url: string;
            previewUrl?: string | null;
            folder?: number;
            folderPath: string;
            provider: string;
            provider_metadata?: {
              [key: string]: unknown;
            } | null;
            createdAt: string;
            updatedAt: string;
            createdBy?: number;
            updatedBy?: number;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "upload/delete/files_by_id": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            name: string;
            alternativeText?: string | null;
            caption?: string | null;
            width?: number;
            height?: number;
            formats?: {
              [key: string]: unknown;
            };
            hash: string;
            ext?: string;
            mime: string;
            size: number;
            url: string;
            previewUrl?: string | null;
            folder?: number;
            folderPath: string;
            provider: string;
            provider_metadata?: {
              [key: string]: unknown;
            } | null;
            createdAt: string;
            updatedAt: string;
            createdBy?: number;
            updatedBy?: number;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "i18n/get/locales": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            name: string;
            code: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string | null;
            isDefault: boolean;
          }[];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/connect_____": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/auth_local": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          identifier: string;
          password: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            jwt: string;
            refreshToken?: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              email: string;
              firstName: string;
              lastName: string;
              provider: string;
              accessLevel: number;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/auth_local_register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          username: string;
          email: string;
          password: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json":
            | {
                jwt: string;
                refreshToken?: string;
                user: {
                  id: number;
                  documentId: string;
                  username: string;
                  firstName: string;
                  lastName: string;
                  email: string;
                  provider: string;
                  confirmed: boolean;
                  blocked: boolean;
                  role?:
                    | number
                    | {
                        id: number;
                        name: string;
                        description: string | null;
                        type: string;
                        createdAt: string;
                        updatedAt: string;
                      };
                  createdAt: string;
                  updatedAt: string;
                  publishedAt: string;
                };
              }
            | {
                user: {
                  id: number;
                  documentId: string;
                  username: string;
                  firstName: string;
                  lastName: string;
                  email: string;
                  provider: string;
                  confirmed: boolean;
                  blocked: boolean;
                  role?:
                    | number
                    | {
                        id: number;
                        name: string;
                        description: string | null;
                        type: string;
                        createdAt: string;
                        updatedAt: string;
                      };
                  createdAt: string;
                  updatedAt: string;
                  publishedAt: string;
                };
              };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/auth_by_provider_callback": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        provider: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            jwt: string;
            refreshToken?: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              firstName: string;
              lastName: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/auth_forgot_password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          email: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            ok: boolean;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/auth_reset_password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          code: string;
          password: string;
          passwordConfirmation: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            jwt: string;
            refreshToken?: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              firstName: string;
              lastName: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/auth_email_confirmation": {
    parameters: {
      query?: {
        confirmation: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/auth_send_email_confirmation": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          email: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            email: string;
            sent: boolean;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/auth_change_password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          currentPassword: string;
          password: string;
          passwordConfirmation: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            jwt: string;
            refreshToken?: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              firstName: string;
              lastName: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/auth_refresh": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/auth_logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/users_count": {
    parameters: {
      query?: {
        filters?: {
          [key: string]: unknown;
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": number;
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/users": {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | "*"
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
        sort?:
          | string
          | string[]
          | {
              [key: string]: "asc" | "desc";
            }
          | {
              [key: string]: "asc" | "desc";
            }[];
        pagination?: {
          withCount?: boolean;
        } & (
          | {
              page: number;
              pageSize: number;
            }
          | {
              start: number;
              limit: number;
            }
        );
        filters?: {
          [key: string]: unknown;
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            username: string;
            firstName: string;
            lastName: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          }[];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          username: string;
          email: string;
          password: string;
          role?: number;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            username: string;
            firstName: string;
            lastName: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/users_me": {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | "*"
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            username: string;
            firstName: string;
            lastName: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/users_by_id": {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | "*"
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            username: string;
            firstName: string;
            lastName: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/put/users_by_id": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          username?: string;
          email?: string;
          password?: string;
          role?: number;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            username: string;
            firstName: string;
            lastName: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/delete/users_by_id": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: number;
            documentId: string;
            username: string;
            firstName: string;
            lastName: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/roles_by_id": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            role: {
              id: number;
              documentId: string;
              name: string;
              description: string | null;
              type: string;
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
              nb_users?: number;
              permissions?: {
                [key: string]: {
                  controllers: {
                    [key: string]: {
                      [key: string]: {
                        enabled: boolean;
                        policy: string;
                      };
                    };
                  };
                };
              };
              users?: unknown[];
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/roles": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            roles: {
              id: number;
              documentId: string;
              name: string;
              description: string | null;
              type: string;
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
              nb_users?: number;
              permissions?: {
                [key: string]: {
                  controllers: {
                    [key: string]: {
                      [key: string]: {
                        enabled: boolean;
                        policy: string;
                      };
                    };
                  };
                };
              };
              users?: unknown[];
            }[];
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/post/roles": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          name: string;
          description?: string;
          type: string;
          permissions?: {
            [key: string]: unknown;
          };
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            ok: boolean;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/put/roles_by_role": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        role: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          name?: string;
          description?: string;
          type?: string;
          permissions?: {
            [key: string]: unknown;
          };
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            ok: boolean;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/delete/roles_by_role": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        role: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            ok: boolean;
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  "users-permissions/get/permissions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            permissions: {
              [key: string]: {
                controllers: {
                  [key: string]: {
                    [key: string]: {
                      enabled: boolean;
                      policy: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
}
