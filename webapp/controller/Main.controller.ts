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
		bindUI5InputValue(super.byId<Input>('firstNameInput'), this.firstName);
		bindUI5InputValue(super.byId<Input>('lastNameInput'), this.lastName);

		// Text Output
		createEffect(() =>
			super.byId<Text>('greetingText').setText(`Hello ${this.firstName.get()} ${this.lastName.get()}`)
		);
	}

	onDebug() {
		console.log(this.firstName.get());
		this.firstName.set('foobar');
		console.log(this.firstName.get());
	}
}
