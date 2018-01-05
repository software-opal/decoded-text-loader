/* eslint-env jest */
import loader from 'raw-loader';

import compiler from './compiler';


describe('UTF-8', () => {
  const expectedOutput = loader('Hello from UTF-8. ☀️\n');
  test('UTF-8, with a BOM', async () => {
    const stats = await compiler('testcase/utf-8-bom.txt');
    expect(stats.toJson().errors).toEqual([]);
    const output = stats.toJson().modules[0].source;

    expect(output).toEqual(expectedOutput);
  });
  test('UTF-8, without a BOM', async () => {
    const stats = await compiler('testcase/utf-8-no-bom.txt');
    expect(stats.toJson().errors).toEqual([]);
    const output = stats.toJson().modules[0].source;

    expect(output).toEqual(expectedOutput);
  });
});

describe('UTF-16', () => {
  const expectedOutput = loader('Hello from UTF-16. ✨\n');

  test('UTF-16BE, with a BOM', async () => {
    const stats = await compiler('testcase/utf-16be-bom.txt');
    expect(stats.toJson().errors).toEqual([]);
    const output = stats.toJson().modules[0].source;

    expect(output).toEqual(expectedOutput);
  });

  test('UTF-16LE, with a BOM', async () => {
    const stats = await compiler('testcase/utf-16le-bom.txt');
    expect(stats.toJson().errors).toEqual([]);
    const output = stats.toJson().modules[0].source;

    expect(output).toEqual(expectedOutput);
  });
});
