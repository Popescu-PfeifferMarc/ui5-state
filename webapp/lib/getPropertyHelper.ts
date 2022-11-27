import JSONModel from 'sap/ui/model/json/JSONModel';

type Model = { [x in string]: unknown };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPropertyHelper<T extends Model>(model: T) {
	return function getProperty<K extends keyof T>(oModel: JSONModel, param: K) {
		return oModel.getProperty(`/${param as string}`) as T[K];
	};
}

export type PropertyHelper<T extends Model> = ReturnType<typeof getPropertyHelper<T>>;
export default getPropertyHelper;
