import BaseController from './BaseController';
import Text from 'sap/m/Text';
import Input from 'sap/m/Input';

import { createEffect, createSignal } from '../lib/fluid';
import JSONModel from 'sap/ui/model/json/JSONModel';
import getPropertyHelper, { PropertyHelper } from '../lib/getPropertyHelper';

const model = {
	firstName: '',
	lastName: '',
	greeting: '',
};

/**
 * @namespace test.ui5solid.controller
 */
export default class Main extends BaseController {
	private oModel: null | JSONModel = null;

	private firstName = createSignal('');
	private lastName = createSignal('');

	private propertyHelper: null | PropertyHelper<typeof model> = null;

	onInit() {
		// Model
		this.oModel = new JSONModel(model);
		this.getView().setModel(this.oModel);
		this.propertyHelper = getPropertyHelper(model);
	}

	onDebug() {
		const test = this.propertyHelper(this.oModel, 'firstName');
	}
}
