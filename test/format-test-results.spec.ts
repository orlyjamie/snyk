import { extractDataToSendFromResults } from '../src/cli/commands/test/formatters/format-test-results';
import { Options } from '../src/lib/types';

describe('format-test-results', () => {
  describe('extractDataToSendFromResults', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should not create any JSON unless it is needed per options', () => {
      const options = {} as Options;
      const jsonStringifySpy = jest.spyOn(JSON, 'stringify');
      extractDataToSendFromResults({}, {}, options);
      expect(jsonStringifySpy).toHaveBeenCalledTimes(0);
    });

    it('should create Snyk JSON and only Snyk JSON if --json is set in the options', () => {
      const options = {
        json: true,
      } as Options;
      const jsonStringifySpy = jest.spyOn(JSON, 'stringify');
      extractDataToSendFromResults({}, {}, options);
      expect(jsonStringifySpy).toHaveBeenCalledTimes(1);
    });

    it('should create Snyk JSON and only Snyk JSON if --json-file-output is set in the options', () => {
      const options = {} as Options;
      options['json-file-output'] = 'somefile.json';
      const jsonStringifySpy = jest.spyOn(JSON, 'stringify');
      extractDataToSendFromResults({}, {}, options);
      expect(jsonStringifySpy).toHaveBeenCalledTimes(1);
    });

    it('should create SARIF JSON and only SARIF JSON if --sarif is set in the options', () => {
      const options = {
        sarif: true,
      } as Options;
      const jsonStringifySpy = jest.spyOn(JSON, 'stringify');
      extractDataToSendFromResults([], {}, options);
      expect(jsonStringifySpy).toHaveBeenCalledTimes(1);
    });

    it('should create SARIF JSON and only SARIF JSON if --sarif-file-output is set in the options', () => {
      const options = {} as Options;
      options['sarif-file-output'] = 'somefile.json';
      const jsonStringifySpy = jest.spyOn(JSON, 'stringify');
      extractDataToSendFromResults([], {}, options);
      expect(jsonStringifySpy).toHaveBeenCalledTimes(1);
    });
  });
});
