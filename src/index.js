const txtEnc = require('text-encoding');
const chardet = require('jschardet');
const { Buffer } = require('buffer');

function loader(source) {
  // TODO: Allow users to specify the exact encoding.
  if (this.cacheable) this.cacheable();
  const buffer = Buffer.from(source, 'binary');
  const result = chardet.detect(buffer);
  if (result && result.encoding) {
    const decoder = new txtEnc.TextDecoder(result.encoding);
    const value = decoder.decode(buffer);
    return value;
  }
  throw new Error('Failed to detect the encoding of the source file.');
}
loader.raw = true;

module.exports = loader;
