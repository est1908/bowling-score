import { Frame } from './frame';

describe('regular frame', () => {
  test('first: 0', () => {
    const frame = createFrame();
    frame.add(0);

    expect(frame.tries.length).toBe(1);
    expect(frame.tries[0]).toBe(0);
    expect(frame.isSpare).toBeFalsy();
    expect(frame.isStrike).toBeFalsy();
  });

  test('first: 0; second: 10 - SPARE!', () => {
    const frame = createFrame();
    frame.add(0);
    frame.add(10);

    expect(frame.tries.length).toBe(2);
    expect(frame.tries[0]).toBe(0);
    expect(frame.tries[1]).toBe(10);
    expect(frame.isSpare).toBeTruthy();
    expect(frame.isStrike).toBeFalsy();
  });

  test('first: 5; second: 5 - SPARE!', () => {
    const frame = createFrame();
    frame.add(5);
    frame.add(5);

    expect(frame.isSpare).toBeTruthy();
  });

  test('first: 10; STRIKE!', () => {
    const frame = createFrame();
    frame.add(10);

    expect(frame.isSpare).toBeFalsy();
    expect(frame.isStrike).toBeTruthy();
  });

  test('throw exceptions on invalid values', () => {
    const frame = createFrame();

    expect(() => frame.add(-5)).toThrow();
    expect(() => frame.add(11)).toThrow();
  });

  test('throw exceptions on 3 attempt', () => {
    const frame = createFrame();
    frame.add(0);
    frame.add(5);
    expect(() => frame.add(5)).toThrow();
  });

  function createFrame() {
    return new Frame();
  }
});

describe('last frame', () => {
  test('first strike allows 3 attempts', () => {
    const frame = createLastFrame();
    frame.add(10);
    frame.add(5);
    frame.add(2);
    expect(frame.tries.length).toBe(3);
    expect(frame.tries[0]).toBe(10);
    expect(frame.tries[1]).toBe(5);
    expect(frame.tries[2]).toBe(2);
  });

  test('3 strikes', () => {
    const frame = createLastFrame();
    frame.add(10);
    frame.add(10);
    frame.add(10);
    expect(frame.tries.length).toBe(3);
    expect(frame.tries[0]).toBe(10);
    expect(frame.tries[1]).toBe(10);
    expect(frame.tries[2]).toBe(10);
  });

  test('can not do 3 attempt withous spare', () => {
    const frame = createLastFrame();
    frame.add(2);
    frame.add(3);
    expect(() => frame.add(5)).toThrow();
  });

  function createLastFrame() {
    return new Frame();
  }
});
