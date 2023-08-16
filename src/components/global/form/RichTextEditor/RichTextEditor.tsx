import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'header',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
  'video',
  'color',
  'background',
  'font',
];

const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },
};

const ReactQuillNoSSR = dynamic(() => import('react-quill'), { ssr: false });

interface PropType {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const RichTextEditor = ({ state, setState }: PropType) => {
  return (
    <ReactQuillNoSSR
      theme="snow"
      value={state}
      onChange={setState}
      modules={modules}
      formats={formats}
    />
  );
};

export default RichTextEditor;
