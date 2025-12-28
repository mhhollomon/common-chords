export type ChordDisplayProps = {
    className?: string,
    matchSymbol?: string,
    chordName: string,
    bgColor?: string
}

export default function ChordDisplay({className, matchSymbol, chordName, bgColor}: ChordDisplayProps) {

    let styles : React.CSSProperties = {}

    if (bgColor) {
        styles["backgroundColor"] = bgColor;
    }

    return (
        <div className={className} style={styles}>{chordName}
        {matchSymbol ? <p>{matchSymbol}</p> : <p></p>}
        </div>
    )
}
