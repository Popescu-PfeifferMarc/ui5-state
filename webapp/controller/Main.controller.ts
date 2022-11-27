import BaseController from './BaseController';

import { bindUI5ModelProperty, createEffect, createSignal } from '../lib/fluid';
import JSONModel from 'sap/ui/model/json/JSONModel';

/**
 * @namespace test.ui5solid.controller
 */
export default class Main extends BaseController {
	private model: JSONModel = null;

	private firstName = createSignal('');
	private lastName = createSignal('');
	private greeting = createSignal('');

	onInit() {
		// Model
		this.model = new JSONModel({});
		this.getView().setModel(this.model);

		// Bind Properties
		bindUI5ModelProperty(this.model, '/firstName', this.firstName);
		bindUI5ModelProperty(this.model, '/lastName', this.lastName);
		bindUI5ModelProperty(this.model, '/greeting', this.greeting);

		// Derive State
		createEffect(() => this.greeting.set(`Hi ${this.firstName.get()}, ${this.lastName.get()}`));
	}

	onDebug() {
		console.log(this.model.getProperty('/greeting'));
	}
}
