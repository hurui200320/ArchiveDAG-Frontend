import { TruncateMultihashPipe } from './truncate-multihash.pipe';

describe('TruncateMultihashPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateMultihashPipe();
    expect(pipe).toBeTruthy();
  });
});
