
import { cn } from "~/lib/utils"
import  KeyPicker from "./key-picker";

export type CommonChordsProps = {
    className?: string
}

export default function CommonChords({className}: CommonChordsProps) {
    return (
        <main className={cn("container d-flex flex-column", className)}>
            <KeyPicker />
            <KeyPicker />
        </main>
    )
}