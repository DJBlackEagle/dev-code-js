import { afterEach, describe, expect, it, vi } from 'vitest';

describe('CLI Binary Entrypoint (bin.ts)', () => {
  const originalArgv = process.argv;
  const originalExitCode = process.exitCode;

  afterEach(() => {
    process.argv = originalArgv;
    process.exitCode = originalExitCode;
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('should invoke runCli and set process.exitCode', async () => {
    const stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    process.argv = ['node', 'bin.js', '--help'];

    await import('./bin.js');

    expect(process.exitCode).toBe(0);
    expect(stdoutSpy).toHaveBeenCalled();
  });
});
