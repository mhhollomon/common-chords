
import { cn, range } from "~/lib/utils"
import KeyPicker from "./key-picker";
import ChordDisplay from "~/components/chord-display";
import { useState } from "react";
import { Scale } from "~/lib/scale";


export type CommonChordsProps = {
    className?: string
}

export default function CommonChords({ className }: CommonChordsProps) {
    const [firstScale, setFirstScale] = useState<Scale>(new Scale());
    const [secondScale, setSecondScale] = useState<Scale>(new Scale('G', 'major'));


    const matchSymbol = [
        '\u{1d770}', // alpha
        '\u{1d771}', // beta
        '\u{1d772}', // gamma
        '\u{1d773}', // delta
        '\u{1d774}', // epsilon
        '\u{1d775}', // zeta
        '\u{1d776}', // eta
    ]

    const matchColors = [
        '#18f000',
        '#16d000',
        '#2090b0',
        '#e05030',
        '#169000',
        '#306070',
        '#a04050',
    ]

    function empty_match_array() : number[] {
        let retval : number[] = [];
        retval.length = 7;
        retval = retval.fill(-10);
        return retval;
    }

    let common_1 = empty_match_array();
    let common_2 = empty_match_array();

    let match_index = 0;

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            const chord1 = firstScale.chordForDegree(i + 1);
            const chord2 = secondScale.chordForDegree(j + 1);
            if (common_2[j] < 0 && chord1.isSameName(chord2)) {
                common_1[i] = match_index;
                common_2[j] = match_index;
                match_index += 1;
            }
        }
    }

    const cellClasses = "border-dark border-1"

    return (
        <main className={cn("container", className)}>
            <div className="m-4">
                <h3>Find Common Chords Between Keys</h3>
                <p>Just because.</p>
            </div>
            <table className="table text-center">
                <thead>
                    <tr><th className={cellClasses} scope="col" key="0" style={{width: "15rem"}}>Key</th>
                    {range(1, 8).map((degree) => {
                        return <th className={cellClasses} scope="col" key={degree} style={{width: "8rem"}}>{degree}</th>
                    })}
                    </tr>
                </thead>
                <tbody>
                    <tr style={{height: "5rem"}}>
                        <td className={cellClasses}><KeyPicker scale={firstScale} setScale={setFirstScale} /></td>
                    {range(1, 8).map((degree) => {

                        let styles : React.CSSProperties = {}
                        if (common_1[degree-1] >= 0) {
                            styles["backgroundColor"] = matchColors[common_1[degree-1]]
                        }

                        return <td className={cellClasses} key={degree} style={styles}>
                            <ChordDisplay
                                matchSymbol={common_1[degree-1] >= 0 ? matchSymbol[common_1[degree-1]] : undefined}
                                bgColor={common_1[degree-1] >= 0 ? matchColors[common_1[degree-1]] : undefined}
                                chordName={firstScale.chordForDegree(degree).name()} />
                            </td>
                    })}
                    </tr>
                    <tr style={{height: "5rem"}}>
                        <td className={cellClasses}><KeyPicker scale={secondScale} setScale={setSecondScale} /></td>
                    {range(1, 8).map((degree) => {
                        let styles : React.CSSProperties = {}
                        if (common_2[degree-1] >= 0) {
                            styles["backgroundColor"] = matchColors[common_2[degree-1]]
                        }

                        return <td className={cellClasses} key={degree} style={styles}>
                            <ChordDisplay  matchSymbol={common_2[degree-1] >= 0 ? matchSymbol[common_2[degree-1]] : undefined}
                                chordName={secondScale.chordForDegree(degree).name()} />
                        </td>
                    })}
                    </tr>
                </tbody>
            </table>

        </main>
    )
}
