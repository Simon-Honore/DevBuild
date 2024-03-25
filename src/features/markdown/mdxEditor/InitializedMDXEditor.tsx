"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  BoldItalicUnderlineToggles,
  UndoRedo,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import type { ForwardedRef } from "react";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      contentEditableClassName="prose dark:prose-invert"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
