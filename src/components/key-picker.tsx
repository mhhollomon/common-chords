//import {type Scale, type ScaleType, ALL_SCALE_TYPES} from "~/lib/scale";
import {ALL_SCALE_TYPES} from "~/lib/scale";

export default function KeyPicker() {

    return (
        <div>
<input type="text" className="d-inline"  style={{maxWidth: "60px"}} />
<select className="d-inline"  style={{maxWidth: "150px"}}>
    {ALL_SCALE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
</select>

        </div>
    )
}