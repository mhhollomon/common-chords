import {ALL_SCALE_TYPES, Scale, type ScaleType} from "~/lib/scale";

export type KeyPickerProps = {
    scale : Scale,
    setScale : (scale : Scale) => void
}
export default function KeyPicker({ scale, setScale } : KeyPickerProps) {

    let scale_type = scale.type;

    return (
        <div>
<input type="text" name="center" className="btn d-inline" style={{maxWidth: "60px"}} defaultValue={scale.center}
        onChange={(e) => setScale(scale.setCenter(e.target.value))} />
<select className="btn d-inline" name="scale" style={{maxWidth: "150px"}} value={scale_type}
        onChange={(e) => setScale(scale.setType(e.target.value as ScaleType))}>
    {ALL_SCALE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
</select>

        </div>
    )
}
