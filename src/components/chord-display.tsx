export type ChordDisplayProps = {
    className?: string,
    matchSymbol?: string,
    chordName: string,
    bgColor?: string,
    fgColor?: string
}

export default function ChordDisplay(
    {className, matchSymbol, chordName, bgColor, fgColor}: ChordDisplayProps) {

    let styles : React.CSSProperties = {}

    if (bgColor) {
        styles["backgroundColor"] = bgColor;
    }

    if (fgColor) {
        styles["color"] = fgColor;
    }

    return (
        <div className={className} style={styles}><p className="m-0 fs-6">{chordName}</p>
        {matchSymbol ? <p className="fs-5">{matchSymbol}</p> : <p></p>}
        </div>
    )
}
