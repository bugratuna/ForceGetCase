import { of, throwError } from 'rxjs';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: jasmine.SpyObj<ApiService>;
  it('should retry the API request twice if it fails', () => {
    const endpoint = 'testEndpoint';
    const mockError = new Error('Mock error');
    const mockResponse = { success: true, resultObject: { data: 'test data' } };

    const httpGetSpy = spyOn(service['http'], 'get').and.returnValues(
      throwError(() => mockError),
      of(mockResponse),
    );
    // @ts-ignore
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();

    service.get<any>(endpoint).subscribe(
      (result) => {
        expect(result).toEqual(mockResponse.resultObject);
        expect(httpGetSpy).toHaveBeenCalledTimes(2);
        expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      },
      (error) => fail('Expected to succeed, but got error: ' + error),
    );
  });
  it('should return the API response as is when the API response is not successful', () => {
    const mockResponse = { success: false, message: 'Error message' };
    spyOn(service['http'], 'get').and.returnValue(of(mockResponse));

    service.get('testEndpoint').subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });
  });
  it('should return the result object when the API response is successful', () => {
    const mockResponse = { success: true, resultObject: { data: 'test data' } };
    spyOn(service['http'], 'get').and.returnValue(of(mockResponse));

    service.get('testEndpoint').subscribe((result) => {
      expect(result).toEqual(mockResponse.resultObject);
    });
  });
});
