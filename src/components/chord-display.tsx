export type ChordDisplayProps = {
    className?: string,
    matchSymbol?: string,
    chordName: string
}

export default function ChordDisplay({className, matchSymbol, chordName}: ChordDisplayProps) {

    return (
        <div className={className}>{chordName}
        {matchSymbol ? <p>{matchSymbol}</p> : <p></p>}
        </div>
    )
}
