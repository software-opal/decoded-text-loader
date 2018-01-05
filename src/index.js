import { TextDecoder } from 'text-encoding';
import { detect } from 'jschardet';

export default function loader(source) {
  if (this.cacheable) this.cacheable();
  this.value = source;
  const result = detect(source);
  if (result && result.encoding) {
    return new TextDecoder(result.encoding).decode(source);
  }
  throw new Error('Failed to detect the encoding of the source file.');
}
