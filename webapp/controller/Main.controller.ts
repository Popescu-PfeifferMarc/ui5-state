import BaseController from './BaseController';
import Text from 'sap/m/Text';
import Input from 'sap/m/Input';

import { createEffect, createSignal, bindUI5InputValue } from '../lib/fluid';

/**
 * @namespace test.ui5solid.controller
 */
export default class Main extends BaseController {
	private firstName = createSignal('');
	private lastName = createSignal('');

	onInit() {
		// Input
		const firstNameInputElement = this.getView().byId('firstNameInput') as Input;
		bindUI5InputValue(firstNameInputElement, this.firstName);
		const lastNameInputElement = this.getView().byId('lastNameInput') as Input;
		bindUI5InputValue(lastNameInputElement, this.lastName);

		// Text Output
		const greetingTextElement = this.getView().byId('greetingText') as Text;
		createEffect(() =>
			greetingTextElement.setText(`Hello ${this.firstName.get()} ${this.lastName.get()}`)
		);
	}

	onDebug() {
		console.log(this.firstName.get());
		this.firstName.set('foobar');
		console.log(this.firstName.get());
	}
}
