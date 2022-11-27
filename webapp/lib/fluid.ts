import Input from 'sap/m/Input';
import Event from 'sap/ui/base/Event';
import Binding from 'sap/ui/model/Binding';
import JSONModel from 'sap/ui/model/json/JSONModel';

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
	inputElement.attachLiveChange((event: Event) => {
		console.log('EEE');
		signal.set(`${event.getParameter('value') as string}`);
	});
}

export function bindUI5ModelProperty<
	T extends boolean | number | string | undefined | null | BigInteger | RegExp | Date
>(oModel: JSONModel, sPath: string, signal: Signal<T>) {
	// Initial
	oModel.setProperty(sPath, signal.get());

	// Model -> Signal
	const binding = new Binding(oModel, sPath, undefined);
	binding.attachChange(function () {
		const nextValue = oModel.getProperty(sPath) as T;
		if (signal.get() !== nextValue) {
			signal.set(nextValue);
		}
	});

	// Signal -> Model
	createEffect(() => oModel.getProperty(sPath) !== signal.get() && oModel.setProperty(sPath, signal.get()));
}
// #endregion UI5 Helpers
