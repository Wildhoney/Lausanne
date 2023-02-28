import {Props} from "./types.js"
import {node} from "lausanne"

export default function Coords({value}: Props) {
    return <div class="coords">
        {value.lat}, {value.lon}
    </div>
}