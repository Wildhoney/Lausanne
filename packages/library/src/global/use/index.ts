import { createEffect, createSignal } from "solid-js";

export const kinds = {
  state: Symbol("swiss/state"),
};

function useState(defaultValue) {
  const [value, setValue] = createSignal(defaultValue);

  function getValue() {
    return {
      kind: kinds.state,
      value,
    };
  }

  return [getValue, setValue] as [any, any];
}

export const use = {
  state: useState,
  effect: createEffect,
};
