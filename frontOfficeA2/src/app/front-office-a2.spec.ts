import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {FrontOfficeA2App} from '../app/front-office-a2';

beforeEachProviders(() => [FrontOfficeA2App]);

describe('App: FrontOfficeA2', () => {
  it('should have the `defaultMeaning` as 42', inject([FrontOfficeA2App], (app) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([FrontOfficeA2App], (app) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

