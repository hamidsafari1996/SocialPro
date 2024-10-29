declare module 'react-quill' {
  import { Component } from 'react';

  interface QuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (content: string, delta: any, source: any, editor: any) => void;
    theme?: string;
    className?: string;
    // ...other props you might need
  }

  class ReactQuill extends Component<QuillProps> {}
  export default ReactQuill;
}
