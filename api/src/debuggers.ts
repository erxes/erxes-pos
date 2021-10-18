import * as debug from 'debug';

export const debugExternalApi = debug('pos-api:external-api-fetcher');
export const debugInit = debug('pos-api:init');
export const debugDb = debug('pos-api:db');
export const debugBase = debug('pos-api:base');
export const debugError = debug('pos-api:error');

export const debugRequest = (debugInstance, req) =>
  debugInstance(`
        Receiving ${req.path} request from ${req.headers.origin}
        header: ${JSON.stringify(req.headers || {})}
        body: ${JSON.stringify(req.body || {})}
        queryParams: ${JSON.stringify(req.query)}
    `);

export const debugResponse = (debugInstance, req, data = 'success') =>
  debugInstance(
    `Responding ${req.path} request to ${req.headers.origin} with ${data}`
  );
