import * as rp from 'request-promise-native';

export class ApiTokenResolver {

  public static getAccessToken(host: string, apiToken: string, proxy?: string) {
    // (node:8575) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
    const base64ApiToken = Buffer.from('apitoken:' + apiToken).toString('base64');
    const options = {
      url: host + '/services/mtm/v1/oauth2/token',
      headers: { 'Authorization': 'Basic ' + base64ApiToken },
      form: { grant_type: 'client_credentials' }
    };
    return rp.post({ ...options, proxy })
      .then(response => JSON.parse(response)['access_token']);
  }

}