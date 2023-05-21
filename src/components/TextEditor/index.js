
import React from "react";
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

var modules = {
    toolbar: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] }
        ]
    ]
};

var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
];

const TextEditor = ({ content, handleChangeContent }) => {
    return (
        <ReactQuill
            className="w-4/5 h-3/5"
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Escribir"
            value={content}
            onChange={handleChangeContent} />
    )
}

export default TextEditor