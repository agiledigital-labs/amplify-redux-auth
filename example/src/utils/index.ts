import { isNil, isEmpty } from 'lodash/fp';

export const notNil = <T>(value?: T): value is T => !isNil(value);

export const notEmpty = <T>(value?: T): value is T => !isEmpty(value);
