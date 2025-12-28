
import { cn, range } from "~/lib/utils"
import KeyPicker from "./key-picker";
import ChordDisplay from "~/components/chord-display";
import { useState } from "react";
import { Scale } from "~/lib/scale";



const grid_style = {
    display: 'grid',
    gridGap: '1rem 0.5rem',
    marginRight: '1rem',
    gridTemplateColumns: '10rem repeat(7, 5rem)',
    gridTemplateRows: '4rem 4rem',
};

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
            if (common_2[j] < 0 && chord1.isSame(chord2)) {
                common_1[i] = match_index;
                common_2[j] = match_index;
                match_index += 1;
            }
        }
    }

    return (
        <main className={cn("container d-flex flex-column", className)}>
            <div className="col-5 flex-grow pe-5">
                <div className="mx-1 ps-1" style={grid_style}>
                    <div className="first-row">
                        <KeyPicker scale={firstScale} setScale={setFirstScale} />
                    </div>
                    {range(1, 8).map((degree) => {

                        return <ChordDisplay key={degree} matchSymbol={common_1[degree-1] >= 0 ? matchSymbol[common_1[degree-1]] : undefined}
                                chordName={firstScale.chordForDegree(degree).name()} className="first-row" />
                    })}

                    <div className="second-row">
                        <KeyPicker scale={secondScale} setScale={setSecondScale} />
                    </div>
                    {range(1, 8).map((degree) => {
                        return <ChordDisplay key={degree} matchSymbol={common_2[degree-1] >= 0 ? matchSymbol[common_2[degree-1]] : undefined}
                                chordName={secondScale.chordForDegree(degree).name()} className="second-row" />
                    })}
                </div>
            </div>
        </main>
    )
}
