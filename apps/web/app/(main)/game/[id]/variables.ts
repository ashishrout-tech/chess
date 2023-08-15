export let BlackIntervalId: NodeJS.Timer | null;
export let WhiteIntervalId: NodeJS.Timer | null;

export function changeBlackIntervalId(newValue: NodeJS.Timer) {
    BlackIntervalId = newValue;
}

export function changeWhiteIntervalId(newValue: NodeJS.Timer) {
    WhiteIntervalId = newValue;
}