import {createAction, props} from '@ngrx/store';
import {Product} from '../../../shared/model/product.model';
import {Wish} from '../../../shared/model/wish.model';

export const addToWish = createAction('[Wish add]', props<{wish: Wish}>());
export const removeFromWish = createAction('[Wish remove]', props<{id: string}>());
export const addAllToWish = createAction('[Wish add all]', props<{wish: Wish[]}>());
export const clearWish = createAction('[Wish clear]');
