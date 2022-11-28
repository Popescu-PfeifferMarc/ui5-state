import Input from 'sap/m/Input';
import Event from 'sap/ui/base/Event';

// #region Primitives
const context: Array<() => void> = [];

function getCurrentObserver() {
	return context[context.length - 1];
}

export function createEffect(fn: () => unknown) {
	const execute = () => {
		context.push(execute);
		try {
			fn();
		} finally {
			context.pop();
		}
	};

	execute();
}

export type Signal<T> = {
	(): T;
	readonly set: (nextValue: T) => void;
};

export function createSignal<T>(value: T) {
	const subscribers = new Set<() => void>();

	let signal: { (): T; set?: (nextValue: T) => void; } = () => {
		const current = getCurrentObserver();
		if (current) subscribers.add(current);
		return value;
	};

	signal.set = (nextValue: T) => {
		value = nextValue;
		for (const sub of subscribers) {
			sub();
		}
	};

	return signal as Signal<T>;
}
// #endregion Primitives

// #region UI5 Helpers
export function bindUI5InputValue(inputElement: Input, signal: Signal<string>) {
	inputElement.setValue(signal());
	createEffect(() => inputElement.setValue(signal()));
	inputElement.attachLiveChange((event: Event) => signal.set(`${event.getParameter('value') as string}`));
}
// #endregion UI5 Helpers
