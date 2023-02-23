// @ts-nocheck

import { createSignal } from "solid-js";

const [number, setNumber] = createSignal(0);
const [name, setName] = createSignal("Adam");

console.log(name());
