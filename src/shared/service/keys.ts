export const codeKeysFactory = {
  code: () => ['code'],
  runCode: (code: string) => [...codeKeysFactory.code(), 'run', code],
};
