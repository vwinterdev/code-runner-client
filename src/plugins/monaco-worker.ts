// @ts-ignore - ?worker syntax is required for Vite but conflicts with erasableSyntaxOnly
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// @ts-ignore - ?worker syntax is required for Vite but conflicts with erasableSyntaxOnly
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// @ts-ignore - ?worker syntax is required for Vite but conflicts with erasableSyntaxOnly
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// @ts-ignore - ?worker syntax is required for Vite but conflicts with erasableSyntaxOnly
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// @ts-ignore - ?worker syntax is required for Vite but conflicts with erasableSyntaxOnly
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

const install = () => {
  (self as any).MonacoEnvironment = {
    getWorker(_: any, label: string) {
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker();
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker();
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };
  
}

export default {
  install,
}