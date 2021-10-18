import { debugError } from "../debuggers";

export const authCookieOptions = (secure: boolean) => {
  const oneDay = 1 * 24 * 3600 * 1000; // 1 day

  return {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    maxAge: oneDay,
    secure,
  };
};

export const getEnv = ({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}): string => {
  const value = process.env[name];

  if (!value && typeof defaultValue !== "undefined") {
    return defaultValue;
  }

  return value || "";
};

export const routeErrorHandling = (fn, callback?: any) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      debugError(e.message);

      if (callback) {
        return callback(res, e, next);
      }

      return next(e);
    }
  };
};

/**
 * Escapes special characters
 */
 export const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const paginate = (
  collection,
  params: {
    ids?: string[];
    page?: number;
    perPage?: number;
    excludeIds?: boolean;
  }
) => {
  const { page = 0, perPage = 0, ids, excludeIds } = params || { ids: null };

  const _page = Number(page || "1");
  const _limit = Number(perPage || "20");

  if (ids && ids.length > 0) {
    return excludeIds ? collection.limit(_limit) : collection;
  }

  return collection.limit(_limit).skip((_page - 1) * _limit);
};
