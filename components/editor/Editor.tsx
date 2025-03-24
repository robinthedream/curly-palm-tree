import { useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import Table from '@editorjs/table'

interface EditorProps {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    placeholder?: string
}

export function Editor({ value, onChange, disabled, placeholder }: EditorProps) {
    const editorRef = useRef<EditorJS | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const editor = new EditorJS({
            holder: containerRef.current,
            tools: {
                header: {
                    class: Header,
                    config: {
                        levels: [2, 3, 4],
                        defaultLevel: 2
                    }
                },
                list: List,
                quote: Quote,
                marker: Marker,
                inlineCode: InlineCode,
                table: Table
            },
            data: value ? JSON.parse(value) : undefined,
            placeholder: placeholder || 'Start writing your article...',
            readOnly: disabled,
            onChange: async () => {
                const data = await editor.save()
                onChange(JSON.stringify(data))
            }
        })

        editorRef.current = editor

        return () => {
            editor.destroy()
            editorRef.current = null
        }
    }, [])

    // Update editor content when value prop changes
    useEffect(() => {
        if (!editorRef.current || !value) return

        try {
            const data = JSON.parse(value)
            editorRef.current.render(data)
        } catch (err) {
            console.error('Failed to parse editor data:', err)
        }
    }, [value])

    return (
        <div 
            ref={containerRef} 
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none"
        />
    )
} 