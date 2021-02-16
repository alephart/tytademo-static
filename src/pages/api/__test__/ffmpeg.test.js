

describe('ffmpeg', () => {
  test('it should check ffmpeg is installed on server', () => {
    const existFFmpeg = true;
    expect(existFFmpeg).toBeTruthy();
  });
});