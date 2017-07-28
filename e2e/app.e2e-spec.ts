import { AngularAdvancedFormsPage } from './app.po';

describe('angular-advanced-forms App', () => {
  let page: AngularAdvancedFormsPage;

  beforeEach(() => {
    page = new AngularAdvancedFormsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
