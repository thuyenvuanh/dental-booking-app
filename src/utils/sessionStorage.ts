import {isNil} from "lodash";

export class SessionStorage {
    static set = (key: string, value: object): string => {
        const encodedJson = JSON.stringify(value);
        window.sessionStorage.setItem(key, encodedJson);
        return encodedJson;
    };

    static get = <T>(key: string) => {
        const encodedValue: string | null = window.sessionStorage.getItem(key);
        if (isNil(encodedValue)) {
            return null;
        }
        try {
            const decodedObject: T = JSON.parse(encodedValue);
            return decodedObject;
        } catch {
            console.error("Expected type not match with actual type");
            return null;
        }
    };

    static clear = (key: string) => {
        window.sessionStorage.removeItem(key);
    };

    static clearAll = () => window.sessionStorage.clear();
}
