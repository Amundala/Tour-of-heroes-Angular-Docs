import { TextToUpperCaseTransformPipe } from './text-to-upper-case-transform.pipe';

describe('TextToUpperCaseTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new TextToUpperCaseTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
