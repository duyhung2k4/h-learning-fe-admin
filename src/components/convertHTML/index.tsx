import React from "react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";



export type ConvertHTMLProps = {
    defaultContent: string
}
export const ConvertHTML: React.FC<ConvertHTMLProps> = (props) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: props.defaultContent,
        editable: false,
    });



    return (
        <RichTextEditor
            editor={editor}
        >
            <RichTextEditor.Content/>
        </RichTextEditor>
    )
}