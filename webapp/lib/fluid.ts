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
	readonly get: () => T;
	readonly set: (nextValue: T) => void;
};

export function createSignal<T>(value: T): Signal<T> {
	const subscribers = new Set<() => void>();

	const get = () => {
		const current = getCurrentObserver();
		if (current) subscribers.add(current);
		return value;
	};

	const set = (nextValue: T) => {
		value = nextValue;
		for (const sub of subscribers) {
			sub();
		}
	};

	return { get, set } as const;
}
// #endregion Primitives

// #region UI5 Helpers
export function bindUI5InputValue(inputElement: Input, signal: Signal<string>) {
	inputElement.setValue(signal.get());
	createEffect(() => inputElement.setValue(signal.get()));
	inputElement.attachLiveChange((event: Event) => signal.set(`${event.getParameter('value') as string}`));
}
// #endregion UI5 Helpers
