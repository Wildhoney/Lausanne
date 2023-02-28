import { node, VNode } from "lausanne";

export default function Item({ label, value }): VNode {
  return (
    <div class="item">
      <label>{label}:</label>
      <div>{value}</div>
    </div>
  );
}
